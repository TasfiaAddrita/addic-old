from flask import Flask, request, redirect, url_for
from flask_cors import CORS
from keys import YT_API_KEY
import youtube_dl

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "hello"

@app.route('/receivejson', methods=["POST"])
def get_json():
    yt_url = request.get_json()
    print(youtube(yt_url))
    return yt_url

# https://stackoverflow.com/questions/50711867/youtube-api-retrieve-music-in-this-video-info-from-video-metadata
def youtube(url):
    ydl = youtube_dl.YoutubeDL({})
    with ydl:
        video = ydl.extract_info(url, download=False)
    song = { 
        'artist': video['artist'], 
        'track': video['track'] 
    }
    return song

if __name__ == '__main__':
    app.run(debug=True)