import psycopg2

conn = psycopg2.connect(
    host='gwwpushkinmain.cjto8h4s9y7b.us-east-1.rds.amazonaws.com',
    port=5432,
    dbname='gwwpushkinMain',
    user='postgres',
    password='GWW2025migrate!',
    sslmode='require'
)
print('SUCCESS!')
conn.close()
