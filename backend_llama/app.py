from flask import Flask, request, jsonify
from gpt4all import GPT4All
import json

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
SYSTEM_PROMPT = """
You are a friendly cooking assistant.
When the user asks for recipes based on ingredients they have,
always respond with a numbered list of at least five recipes formatted like:
1. Recipe Name
2. Recipe Name
3. Recipe Name
4. Recipe Name
5. Recipe Name

Then ask the user which one they’d like to add to their meal planner.
"""

TOOL_NOTE = """
You can create a recipe for the user.
When the user chooses a recipe number and a day,
reply ONLY with JSON:

{"tool":"addRecipeToPlanner",
 "args":{
     "name":"<recipe name>",
     "description":"<short description>",
     "day":"<Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday>"
 }}

Do NOT add any other text with that JSON.
"""

def build_prompt(msgs):
    prompt = SYSTEM_PROMPT.strip() + "\n\n"
    prompt += TOOL_NOTE + "\n\n"

    for m in msgs:
        role    = m.get('role') or m.get('Role')
        content = m.get('content') or m.get('Content')
        prompt += f"{role}: {content}\n"

    prompt += "assistant:"
    return prompt


@app.route("/chat", methods=["POST"])
def chat():
    msgs  = request.json                    
    reply = model.generate(build_prompt(msgs), max_tokens=256).strip()
    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(port=5005)
