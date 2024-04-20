from flask import Flask, render_template, request, jsonify
from datetime import datetime
from xgboost import XGBClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

model = XGBClassifier(objective="multi:softmax")
model.load_model('model.h5')
label_encoder = joblib.load('label_encoder.pkl')

# Import the predict_weather_for_date function
def predict_weather_for_date(date):
    year = date.year
    month = date.month
    day = date.day
    
    # Predict weather for the date
    prediction = model.predict([[year, month, day]])
    print(prediction)
    predicted_weather = label_encoder.inverse_transform(prediction)[0]
    return predicted_weather


app = Flask(__name__)


# Route to render the index.html template
@app.route("/")
def index():
    return render_template("index.html")


# Route to accept date from the client via POST method
@app.route("/predict_weather", methods=["POST"])
def predict_weather():
    if request.method == "POST":
        # Get the date from the client
        date_str = request.form["date"]
        date = datetime.strptime(date_str, "%Y-%m-%d").date()

        # Call the predict_weather_for_date function with the provided date
        predicted_weather = predict_weather_for_date(date)

        # Return the predicted value as output
        return jsonify({"predicted_weather": predicted_weather})


if __name__ == "__main__":
    app.run(debug=True)
