import mysql.connector
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

def get_db_connection():
    return mysql.connector.connect(
    host="127.0.0.1",  # Force TCP/IP instead of named pipes
    user="root",
    password="1457Debora",
    database="your_database",
    use_pure=True,
    unix_socket=None
)

