from flask import Flask, request, jsonify
from gpt4all import GPT4All
import json
import psycopg2

app = Flask(__name__)

model_name = "mistral-7b-instruct-v0.1.Q4_0.gguf"  # numele modelului
model_path = "models"  # directorul unde se află modelul

full_model_path = f"{model_path}/{model_name}"
# daca nu exista modelul, il descarca
try:
    with open(full_model_path, "rb") as f:
        pass
except FileNotFoundError:
    print(f"Model file {full_model_path} not found. Will download it now.")
    
    model_url = f"https://gpt4all.io/models/gguf/{model_name}"
    import requests
    import os
    
    os.makedirs("models", exist_ok=True)
    response = requests.get(model_url, stream=True)
    if response.status_code == 200:
        with open(full_model_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
    else:
        print(f"Failed to download model: {response.status_code}")
        exit(1) 

model = GPT4All(
    model_name=model_name,  # numele modelului si al fisierului
    model_path=model_path,  # doar directorul
    allow_download=False
)
"""
# Conectarea la PostgreSQL 
conn = psycopg2.connect(
    dbname="ProiectIC",
    user="USERNAME_TAU",
    password="PAROLA_TA",
    host="localhost",
    port="5432"
)
cur = conn.cursor()
"""
@app.route("/chat", methods=["POST"])
def chat():
    messages = request.json

    prompt = "system: You are a helpful assistant. Always reply in clear English.\n"

    for m in messages:
        prompt += f"{m['role']}: {m['content']}\n"

    prompt += "assistant:"

    text = model.generate(prompt, max_tokens=256).strip()
    return jsonify({"reply": text})

if __name__ == "__main__":
    app.run(port=5005)
