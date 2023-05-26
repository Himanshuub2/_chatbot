import psycopg2

def connect():
    connection = psycopg2.connect(user = "postgres",
                                  password = "himanshu",
                                  host = "localhost",
                                  port = "5432",
                                  database = "postgres")
    cursor = connection.cursor()
    return cursor
# cursor = connect()
# cursor.execute("select distinct(associate_id) from user_data")
# rows = cursor.fetchall()
# print(rows)