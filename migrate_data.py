#!/usr/bin/env python3
"""
Data Migration Script: MySQL (old GWW) → PostgreSQL (Pushkin)

Migrates historical Games With Words data from old MySQL database
to new Pushkin PostgreSQL database.

Usage:
    python migrate_data.py --test  # Test mode: migrate 100 users only
    python migrate_data.py --full  # Full migration: all data
"""

import mysql.connector
import psycopg2
import json
import argparse
from datetime import datetime, date, time
from typing import Dict, List, Any
import sys

# Database connection configs
MYSQL_CONFIG = {
    'host': 'gww-archive-cluster.cluster-cjto8h4s9y7b.us-east-1.rds.amazonaws.com',
    'port': 3306,
    'user': 'jkhartshorne',
    'password': 'Ttmisfm!',
    'database': 'clldata'
}

POSTGRES_CONFIG = {
    'host': 'gwwpushkinmain.cjto8h4s9y7b.us-east-1.rds.amazonaws.com',
    'port': 5432,
    'user': 'postgres',
    'password': 'GWW2025migrate',
    'database': 'gwwpushkinMain',
    'sslmode': 'require'
}

# Experiment name mappings
EXPERIMENT_MAPPING = {
    'VocabQuiz': 'vocab-quiz',
    'WhichEnglish': 'which-english',
    # Add more as needed
}

class MigrationStats:
    """Track migration statistics"""
    def __init__(self):
        self.users_migrated = 0
        self.metadata_rows = 0
        self.result_rows = 0
        self.errors = []

    def report(self):
        print("\n" + "="*60)
        print("MIGRATION SUMMARY")
        print("="*60)
        print(f"Users migrated:       {self.users_migrated}")
        print(f"Metadata rows:        {self.metadata_rows}")
        print(f"Result rows:          {self.result_rows}")
        print(f"Errors encountered:   {len(self.errors)}")
        if self.errors:
            print("\nErrors:")
            for err in self.errors[:10]:  # Show first 10 errors
                print(f"  - {err}")
        print("="*60)


def connect_mysql() -> mysql.connector.MySQLConnection:
    """Connect to old MySQL database"""
    try:
        conn = mysql.connector.connect(**MYSQL_CONFIG)
        print(f"✓ Connected to MySQL: {MYSQL_CONFIG['host']}")
        return conn
    except Exception as e:
        print(f"✗ Failed to connect to MySQL: {e}")
        sys.exit(1)


def connect_postgres() -> psycopg2.extensions.connection:
    """Connect to new PostgreSQL database"""
    try:
        print(f"DEBUG: Attempting connection with password: {POSTGRES_CONFIG['password'][:5]}...")
        # Use keyword arguments instead of connection string
        conn = psycopg2.connect(
            host=POSTGRES_CONFIG['host'],
            port=POSTGRES_CONFIG['port'],
            dbname=POSTGRES_CONFIG['database'],
            user=POSTGRES_CONFIG['user'],
            password=POSTGRES_CONFIG['password'],
            sslmode=POSTGRES_CONFIG['sslmode']
        )
        print(f"✓ Connected to PostgreSQL: {POSTGRES_CONFIG['host']}")
        return conn
    except Exception as e:
        print(f"✗ Failed to connect to PostgreSQL: {e}")
        print(f"DEBUG: Config = host={POSTGRES_CONFIG['host']}, user={POSTGRES_CONFIG['user']}, db={POSTGRES_CONFIG['database']}")
        print("  Hint: You may need to:")
        print("  1. Get the PostgreSQL password from AWS Secrets Manager")
        print("  2. Update your security group to allow your IP")
        sys.exit(1)


def get_users_to_migrate(mysql_conn, limit: int = None) -> List[Dict]:
    """Fetch users from old gww_subs table"""
    cursor = mysql_conn.cursor(dictionary=True)

    query = "SELECT * FROM gww_subs"
    if limit:
        query += f" LIMIT {limit}"

    cursor.execute(query)
    users = cursor.fetchall()
    cursor.close()

    print(f"✓ Fetched {len(users)} users from gww_subs")
    return users


def get_experiment_metadata(mysql_conn, user_id: int, experiment: str) -> Dict:
    """Fetch experiment-specific metadata for a user"""
    cursor = mysql_conn.cursor(dictionary=True)
    table_name = f"{experiment}_subs"

    try:
        cursor.execute(f"SELECT * FROM {table_name} WHERE id = %s", (user_id,))
        data = cursor.fetchone()
        cursor.close()
        return data or {}
    except Exception as e:
        cursor.close()
        return {}


def get_experiment_results(mysql_conn, user_id: int, experiment: str) -> List[Dict]:
    """Fetch all results for a user in an experiment"""
    cursor = mysql_conn.cursor(dictionary=True)
    table_name = f"{experiment}_results"

    try:
        cursor.execute(
            f"SELECT * FROM {table_name} WHERE id = %s ORDER BY trial",
            (user_id,)
        )
        results = cursor.fetchall()
        cursor.close()
        return results
    except Exception as e:
        cursor.close()
        return []


def convert_user_id(old_id: int) -> str:
    """Convert old integer ID to new string ID"""
    return f"migrated_{old_id}"


def create_timestamp(date_val, time_val) -> str:
    """Convert MySQL date and time to PostgreSQL timestamp"""
    from datetime import timedelta

    if date_val and time_val:
        # MySQL TIME type returns timedelta, convert to time
        if isinstance(time_val, timedelta):
            total_seconds = int(time_val.total_seconds())
            hours = total_seconds // 3600
            minutes = (total_seconds % 3600) // 60
            seconds = total_seconds % 60
            time_val = time(hours, minutes, seconds)
        dt = datetime.combine(date_val, time_val)
        return dt.isoformat()
    elif date_val:
        return datetime.combine(date_val, datetime.min.time()).isoformat()
    else:
        return datetime.now().isoformat()


def serialize_value(val) -> Any:
    """Convert MySQL values to JSON-serializable format"""
    if isinstance(val, (date, datetime)):
        return val.isoformat()
    elif isinstance(val, time):
        return str(val)
    return val


def migrate_user(pg_conn, user: Dict, stats: MigrationStats) -> bool:
    """Migrate a single user to pushkin_users"""
    cursor = pg_conn.cursor()

    user_id = convert_user_id(user['id'])
    created_at = create_timestamp(user.get('date'), user.get('time'))

    try:
        cursor.execute(
            """
            INSERT INTO pushkin_users (user_id, created_at, updated_at)
            VALUES (%s, %s, NULL)
            ON CONFLICT (user_id) DO NOTHING
            """,
            (user_id, created_at)
        )
        stats.users_migrated += 1
        cursor.close()
        return True
    except Exception as e:
        stats.errors.append(f"User {user_id}: {e}")
        cursor.close()
        return False


def migrate_user_metadata(pg_conn, user: Dict, stats: MigrationStats):
    """Migrate user demographic data to pushkin_userMeta"""
    cursor = pg_conn.cursor()
    user_id = convert_user_id(user['id'])
    created_at = create_timestamp(user.get('date'), user.get('time'))

    # Map demographic fields to metadata
    metadata_fields = {
        'gender': user.get('gender'),
        'age': user.get('age'),
        'natlangs': user.get('natlangs'),
        'primelangs': user.get('primelangs'),
        'dyslexia': user.get('dyslexia'),
        'psychiatric': user.get('psychiatric'),
        'education': user.get('education'),
        'tests': user.get('tests'),
    }

    for field, value in metadata_fields.items():
        if value is not None:
            try:
                cursor.execute(
                    """
                    INSERT INTO "pushkin_userMeta"
                    (user_id, "metaQuestion", "metaResponse", created_at, updated_at)
                    VALUES (%s, %s, %s, %s, NULL)
                    """,
                    (
                        user_id,
                        json.dumps({"field": field}),
                        json.dumps({"value": serialize_value(value)}),
                        created_at
                    )
                )
                stats.metadata_rows += 1
            except Exception as e:
                stats.errors.append(f"User {user_id} metadata {field}: {e}")

    cursor.close()


def migrate_experiment_results(
    mysql_conn, pg_conn, user: Dict, experiment: str, stats: MigrationStats
):
    """Migrate experiment results for a user"""
    cursor = pg_conn.cursor()
    user_id = convert_user_id(user['id'])

    # Fetch results from MySQL
    results = get_experiment_results(mysql_conn, user['id'], experiment)
    if not results:
        cursor.close()
        return

    # Get experiment-specific metadata
    exp_metadata = get_experiment_metadata(mysql_conn, user['id'], experiment)

    # Combine metadata into results JSON
    results_json = []
    for result in results:
        result_dict = {k: serialize_value(v) for k, v in result.items()}
        results_json.append(result_dict)

    # Add experiment metadata to first trial if available
    if exp_metadata and results_json:
        results_json[0]['experiment_metadata'] = {
            k: serialize_value(v) for k, v in exp_metadata.items()
        }

    # Calculate summary stat if applicable (e.g., for VocabQuiz)
    summary_stat = None
    if experiment == 'VocabQuiz':
        # Calculate percentage correct
        correct = sum(1 for r in results if r.get('target') == r.get('answer'))
        summary_stat = (correct / len(results) * 100) if results else 0

    experiment_name = EXPERIMENT_MAPPING.get(experiment, experiment.lower())
    created_at = create_timestamp(results[0].get('date'), results[0].get('time'))

    try:
        cursor.execute(
            """
            INSERT INTO "pushkin_userResults"
            (user_id, experiment, summary_stat, results, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, NULL)
            """,
            (
                user_id,
                experiment_name,
                summary_stat,
                json.dumps(results_json),
                created_at
            )
        )
        stats.result_rows += 1
    except Exception as e:
        stats.errors.append(f"User {user_id} results {experiment}: {e}")

    cursor.close()


def migrate_users_batch(
    mysql_conn, pg_conn, users: List[Dict], experiments: List[str], stats: MigrationStats
):
    """Migrate a batch of users"""
    total = len(users)

    for i, user in enumerate(users, 1):
        if i % 100 == 0:
            print(f"  Progress: {i}/{total} users...")
            pg_conn.commit()

        # Migrate user
        if not migrate_user(pg_conn, user, stats):
            continue

        # Migrate metadata
        migrate_user_metadata(pg_conn, user, stats)

        # Migrate results for each experiment
        for experiment in experiments:
            migrate_experiment_results(mysql_conn, pg_conn, user, experiment, stats)

    pg_conn.commit()
    print(f"  ✓ Completed batch: {total} users")


def main():
    parser = argparse.ArgumentParser(description='Migrate GWW data from MySQL to PostgreSQL')
    parser.add_argument('--test', action='store_true', help='Test mode: migrate 100 users only')
    parser.add_argument('--full', action='store_true', help='Full migration: all data')
    parser.add_argument('--experiments', nargs='+', default=['VocabQuiz', 'WhichEnglish'],
                       help='Experiments to migrate (default: VocabQuiz WhichEnglish)')
    args = parser.parse_args()

    if not (args.test or args.full):
        parser.print_help()
        print("\nError: Must specify either --test or --full")
        sys.exit(1)

    # Connect to databases
    mysql_conn = connect_mysql()
    pg_conn = connect_postgres()

    # Get users to migrate
    limit = 100 if args.test else None
    users = get_users_to_migrate(mysql_conn, limit)

    print(f"\n{'TEST MODE' if args.test else 'FULL MIGRATION'}")
    print(f"Users to migrate: {len(users)}")
    print(f"Experiments: {', '.join(args.experiments)}")
    print("\nStarting migration...\n")

    # Execute migration
    stats = MigrationStats()
    migrate_users_batch(mysql_conn, pg_conn, users, args.experiments, stats)
    stats.report()

    pg_conn.close()
    mysql_conn.close()


if __name__ == '__main__':
    main()
