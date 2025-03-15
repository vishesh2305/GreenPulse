from flask import Flask, request, jsonify
from google import generativeai as genai
from PIL import Image
from flask_cors import CORS
import io
import json
from pymongo import MongoClient
from datetime import datetime
import base64
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app, origins=[os.getenv("CLIENT_URL")] ,supports_credentials=True)
# Gemini API configuration
GENI_API_KEY = os.getenv("GEN_KEY")
genai.configure(api_key=GENI_API_KEY)
gemini_model = genai.GenerativeModel("gemini-2.0-flash")

# MongoDB setup
MONGO_URI = "mongodb+srv://nobita90490:nobita@cluster0.hayjq.mongodb.net/planitary?retryWrites=true&w=majority&appName=Cluster0"
mongo_client = MongoClient(MONGO_URI)
db = mongo_client["chat_db"]
chat_history_collection = db["chat_history"]

def save_chat_history(user_id, prompt, summary):
    entry = {
        "user_id": user_id,
        "history": [
            {"prompt": prompt, "summary": summary, "timestamp": datetime.utcnow()}
        ]
    }
    existing = chat_history_collection.find_one({"user_id": user_id})
    if existing:
        chat_history_collection.update_one(
            {"user_id": user_id},
            {"$push": {"history": {"prompt": prompt, "summary": summary, "timestamp": datetime.utcnow()}}}
        )
    else:
        chat_history_collection.insert_one(entry)

def convert_image(image_data_url):
    try:
        # If the image_data_url is a base64 data URL (as sent by the frontend)
        if image_data_url.startswith("data:image"):
            header, encoded = image_data_url.split(",", 1)
            image_bytes = base64.b64decode(encoded)
            mime_type = header.split(";")[0].replace("data:", "")
            return {"mime_type": mime_type, "data": image_bytes}
        else:
            # Otherwise, treat as a file path (if applicable)
            with Image.open(image_data_url) as img:
                img_bytes = io.BytesIO()
                img.save(img_bytes, format="JPEG")
                return {"mime_type": "image/jpeg", "data": img_bytes.getvalue()}
    except Exception as e:
        print("Error converting image:", e)
        return None

def chunk_text(text, chunk_size=500):
    return [text[i : i + chunk_size] for i in range(0, len(text), chunk_size)]

# Global instructions for Gemini (for plant-related decision)
INSTRUCTIONS = (
    "If the prompt is related to plants, respond with \"1\". "
    "If not, respond with \"0\". "
    "Respond strictly with only \"1\" or \"0\"."
)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    user_id = data.get("user_id")
    prompt = data.get("prompt", "")
    image_path = data.get("image_path", "")

    if not user_id or not prompt:
        return jsonify({"error": "Missing user_id or prompt"}), 400

    # Reassemble prompt if too long
    prompt_chunks = chunk_text(prompt)
    full_prompt = " ".join(prompt_chunks)

    # Step 1: Decide if the prompt is plant-related
    gemini_prompt = f"{INSTRUCTIONS} Prompt: {full_prompt}"
    decision_response = gemini_model.generate_content([{"text": gemini_prompt}])
    decision = decision_response.text.strip()

    if decision == "1":
        # Plant-related: perform analysis
        img_data = convert_image(image_path) if image_path else None
        if img_data:
            analysis_instruction = (
                full_prompt +
                " Please analyze the plant in the image for any signs of disease. " +
                "Provide the output in HTML format. Include a relevant title (using bold and italic tags) " +
                "and a detailed explanation. Use <ul>, <li>, and <br> tags for formatting as needed."
            )
            analysis_contents = [img_data, {"text": analysis_instruction}]
        else:
            analysis_instruction = (
                full_prompt +
                " Please provide the analysis in HTML format with a relevant title (using bold and italic tags) " +
                "and a detailed explanation. Use <ul>, <li>, and <br> tags for formatting as necessary."
            )
            analysis_contents = [{"text": analysis_instruction}]
        analysis_response = gemini_model.generate_content(analysis_contents)
        analysis_text = analysis_response.text.strip()
        final_output = {
            "title": "Plant Analysis Result",
            "response": analysis_text
        }
    else:
        final_output = {
            "title": "Not Plant-Related",
            "response": "The prompt is not related to plants."
        }

    save_chat_history(user_id, full_prompt, final_output)
    print(final_output)
    return jsonify(final_output)

@app.route("/")
def home():
    return "<h1>Hello World</h1>"
port = int(os.environ.get("PORT", 2000))  #


if __name__ == "__main__":
    app.run(port=port, debug=True)
