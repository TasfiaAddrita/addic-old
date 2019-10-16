from flask import Flask, request, redirect, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "hello"

@app.route('/receivejson', methods=["POST"])
def get_json():
    video_id = request.get_json()
    print(video_id)
    # return redirect(url_for('display_json'))
    return video_id

@app.route('/receivejson', methods=["GET"])
def display_json():
    # return video_id

if __name__ == '__main__':
    app.run(debug=True)