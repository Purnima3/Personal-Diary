from flask import Flask, request, jsonify
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Define your routes here
@app.route('/apis/notes', methods=['POST'])
def analyze_notes():
    data = request.json
    notes = data.get('notes', [])
    user = data.get('user', '')
    sa = SentimentIntensityAnalyzer()
    results = []

    for note in notes:
        text = note['content'].lower()
        stop_words = set(stopwords.words('english'))
        text_final = ''.join(c for c in text if not c.isdigit())
        processed_text = ' '.join([word for word in text_final.split() if word not in stop_words])
        sentiment_score = sa.polarity_scores(processed_text)
        compound = round((1 + sentiment_score['compound']) / 2, 2)

        # Determine emotion based on compound score
        emotion = "Neutral"
        if compound > 0.75:
            emotion = "Elated"
        elif compound > 0.5:
            emotion = "Happy"
        elif compound == 0.5:
            emotion = "Neutral"
        elif compound <0.25:
            emotion = "Depressed"
        elif compound < 0.5:
            emotion = "Sad"

        results.append({
            'id': note['id'],
            'processed_text': processed_text,
            'positive': sentiment_score['pos'],
            'negative': sentiment_score['neg'],
            'neutral': sentiment_score['neu'],
            'compound': compound,
            'emotion': emotion
        })

    print("reS" , results)
    return jsonify({'user': user, 'results': results})

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5002, threaded=True)