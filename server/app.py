from flask import Flask, jsonify, render_template
import json
import os

app = Flask(__name__)

# Load data from JSON file
def load_data():
    with open(os.path.join(os.path.dirname(__file__), 'dummy_data/welcome.json'), 'r') as f:
        data = json.load(f)
    return data

@app.route('/api/welcome', methods=['GET'])
def welcome():
    # Fetch the data
    data = load_data()
    return jsonify(data)

@app.route('/')
def index():
    # Fetch the data for the template
    data = load_data()
    return render_template('index.html', **data)

if __name__ == '__main__':
    app.run(debug=True)
