from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, Flask!"


@app.route("/api/conversation", methods=["POST"])
def get_data():
    data = request.json
    api_key = data["apiKey"]
    model = data["model"]
    messages = data["messages"]

    client = OpenAI(api_key=api_key)

    completion = client.chat.completions.create(
        model=model,
        messages=messages,
    )

    return jsonify(completion.choices[0].message.json())


if __name__ == "__main__":
    app.run(debug=True, port=5000)
