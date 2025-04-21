from flask import Flask, request, jsonify
from gpt4all import GPT4All
import json
import psycopg2

app = Flask(__name__)

# La prima rulare, gpt4all va descărca automat modelul
# Poți folosi "gpt4all-small" dacă vrei ceva mai mic
model = GPT4All(
    model_name="mistral-7b-instruct-v0.1.Q4_0.gguf",  # numele modelului si al fisierului
    model_path="models",                               # doar directorul
    allow_download=False
)
"""
# Conectarea la PostgreSQL (completează-ți datele reale)
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
