from flask import Blueprint, jsonify, request
from models.climate_model import ClimateModel

api_routes = Blueprint("api_routes", __name__)

@api_routes.route("/api/predictions", methods=["GET"])
def get_predictions():
    data = ClimateModel.get_predictions()
    return jsonify(data)

@api_routes.route("/api/predictions", methods=["POST"])
def add_prediction():
    try:
        data = request.get_json()
        ClimateModel.add_prediction(
            data["location"], 
            data["temperature"], 
            data["rainfall"], 
            data["impact_level"]
        )
        return jsonify({"message": "Prediction added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
