from database.db_config import get_db_connection

class ClimateModel:
    @staticmethod
    def get_predictions():
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM predictions ORDER BY created_at DESC")
        data = cursor.fetchall()
        cursor.close()
        connection.close()
        return data

    @staticmethod
    def add_prediction(location, temperature, rainfall, impact_level):
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO predictions (location, temperature, rainfall, impact_level) VALUES (%s, %s, %s, %s)",
            (location, temperature, rainfall, impact_level)
        )
        connection.commit()
        cursor.close()
        connection.close()
