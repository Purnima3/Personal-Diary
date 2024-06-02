from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import one_hot
import numpy as np
import re
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

app = Flask(__name__)
CORS(app) 

model = load_model('emotion_model.h5')

vocab_size = 10000
sentence_len = 150

def preprocess_text(text):
    stemmer = PorterStemmer()
    stop_words = set(stopwords.words('english'))

    text = re.sub("[^a-zA-Z]", " ", text)
    text = text.lower()
    text = text.split()
    text = [stemmer.stem(word) for word in text if word not in stop_words]
    text = " ".join(text)

    one_hot_encoded = one_hot(text, vocab_size)
    padded_sequence = pad_sequences([one_hot_encoded], maxlen=sentence_len, padding='pre')

    return padded_sequence

@app.route('/predict', methods=['POST'])
def predict():
    
    input_text = request.json['text']

    processed_text = preprocess_text(input_text)

    prediction = model.predict(processed_text)

    emotion_label = np.argmax(prediction, axis=1)

    emotion_mapping = {0: 'joy', 1: 'sadness', 2: 'anger', 3: 'fear', 4: 'love', 5: 'surprise'}
    predicted_emotion = emotion_mapping[emotion_label[0]]

    return jsonify({'emotion': predicted_emotion})

if __name__ == '__main__':
    app.run(debug=True)