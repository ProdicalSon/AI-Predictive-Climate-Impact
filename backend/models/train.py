import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

# Load dataset
data = pd.read_csv("climate_data.csv")  # Ensure you have a dataset

# Prepare data
X = data[["temperature", "rainfall"]]
y = data["impact_level"]

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "models/climate_model.pkl")
print("Model trained and saved successfully.")
