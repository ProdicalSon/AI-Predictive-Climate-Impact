import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from flask import Flask
from flask_cors import CORS
from routes import api_routes


app = Flask(__name__)
CORS(app)  # Enable CORS for frontend calls

# Register API routes
app.register_blueprint(api_routes)

if __name__ == "__main__":
    app.run(debug=True)
