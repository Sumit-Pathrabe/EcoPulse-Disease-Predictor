from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np

# 1. Initialize the FastAPI App
app = FastAPI(title="EcoPulse Disease Predictor API")

# Allow the frontend to communicate with this API (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace "*" with your frontend's actual URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Load the trained model and scaler
try:
    model = joblib.load('ecopulse_xgboost_model.joblib')
    scaler = joblib.load('ecopulse_scaler.joblib')
except Exception as e:
    print(f"Error loading files. Make sure the .joblib files are in the same directory as main.py. Details: {e}")

# 3. Define the Input Data Structure (Must match Colab exactly)
class HealthDataInput(BaseModel):
    AQI: float
    Temperature_C: float
    Humidity_pct: float
    Population_Density: float

# 4. Create the Prediction Endpoint
@app.post("/predict")
def predict_risk(data: HealthDataInput):
    try:
        # Convert incoming JSON data into a format the model understands (DataFrame)
        input_df = pd.DataFrame([data.model_dump()])
        
        # Scale the data using the exact same scaler from training
        scaled_data = scaler.transform(input_df)
        
        # Make the prediction
        prediction = model.predict(scaled_data)[0]
        
        # Determine the risk level based on the model's binary output (0 or 1)
        risk_label = "High Risk" if prediction == 1 else "Low Risk"
        
        return {
            "prediction_code": int(prediction),
            "risk_level": risk_label,
            "message": "Prediction generated successfully."
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 5. Create a simple health check endpoint
@app.get("/")
def read_root():
    return {"status": "EcoPulse API is up and running!"}