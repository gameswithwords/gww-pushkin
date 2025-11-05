#!/usr/bin/env python3
import psycopg2

conn_string = "host=gwwpushkinmain.cjto8h4s9y7b.us-east-1.rds.amazonaws.com port=5432 dbname=gwwpushkinMain user=postgres password=Ttmisfm! sslmode=require"

print("Attempting connection...")
try:
    conn = psycopg2.connect(conn_string)
    print("SUCCESS!")
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM pushkin_users")
    count = cursor.fetchone()[0]
    print(f"Found {count} users in pushkin_users table")
    cursor.close()
    conn.close()
except Exception as e:
    print(f"FAILED: {e}")
