EcoPulse Disease Predictor 🩺🌱
EcoPulse is an intelligent healthcare trend prediction system that leverages machine learning to assist in early disease detection. By analyzing environmental and physiological data, the platform provides data-driven insights through a modern, responsive interface.

🚀 Features
ML-Powered Predictions: Utilizes a trained XGBoost model for high-accuracy classification.

Real-time API: Backend powered by FastAPI for low-latency model inference.

Modern UI: A sleek, responsive frontend built with JavaScript and Tailwind CSS.

Cloud Trained: Model development and hyperparameter tuning conducted via Google Colab.

🛠️ Tech Stack
Frontend: JavaScript (ES6+), Tailwind CSS, HTML5.

Backend: FastAPI (Python), Uvicorn.

Machine Learning: XGBoost, Scikit-learn, Pandas, NumPy.

Environment: Google Colab (Training), Git/GitHub (Version Control).

📂 Project Structure
Plaintext
├── backend/
│   ├── main.py            # FastAPI application & routes
│   ├── model.pkl          # Exported XGBoost model
│   └── requirements.txt   # Python dependencies
├── frontend/
│   ├── index.html         # Main UI
│   ├── style.css          # Tailwind configurations
│   └── script.js          # API fetch logic
└── notebooks/
    └── EcoPulse_Training.ipynb  # Google Colab training script
⚙️ Setup & Installation
1. Clone the Repository
Bash
git clone https://github.com/your-username/ecopulse-detector.git
cd ecopulse-detector
2. Backend Setup
Navigate to the backend folder, install dependencies, and start the server:

Bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
3. Frontend Setup
Simply open frontend/index.html in your browser. Ensure the API endpoint in script.js matches your local FastAPI URL (usually http://127.0.0.1:8000).

🧠 Model Information
The core of EcoPulse is an XGBoost ensemble model. XGBoost was chosen for its efficiency with tabular data and its ability to handle missing values, which is common in healthcare datasets. The model was trained on Google Colab to leverage GPU acceleration for faster iterations.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Developed by Sumit B.Tech Data Science Student at RCOEM
