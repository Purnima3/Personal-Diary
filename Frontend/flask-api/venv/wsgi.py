from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app = Flask(__name__)
notes_storage = []
@app.route('/apis/notes', methods=['POST'])
def save_notes():
    try:
        # Get the data from the request
        notes = request.json

        # You can add validation or processing logic here

        # Save notes to in-memory storage (or database)
        notes_storage.clear()
        notes_storage.extend(notes)

        return jsonify({"message": "Notes saved successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500