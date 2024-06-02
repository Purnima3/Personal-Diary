from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# In-memory storage for notes
notes_storage = []

@app.route('/apis/notes', methods=['POST'])
def save_notes():
    try:
        # Get the data from the request
        notes = request.json

        # Save notes to in-memory storage (or database)
        notes_storage.clear()
        notes_storage.extend(notes)

        return notes, 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/notes', methods=['GET'])
def get_notes():
    return jsonify(notes_storage), 200

if __name__ == '__main__':
    app.run(debug=True)
