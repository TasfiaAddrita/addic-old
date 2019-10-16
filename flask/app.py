from flask import Flask, request, redirect, url_for, jsonify
from flask_cors import CORS
import youtube_dl
import spotipy
import spotipy.util as util
import keys

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "hello"

@app.route('/receivejson', methods=["POST"])
def get_json():
    yt_url = request.get_json()
    print(yt_get_artist_and_track(yt_url))
    print(yt_url)
    spotify_auth()
    return jsonify({})

# https://stackoverflow.com/questions/50711867/youtube-api-retrieve-music-in-this-video-info-from-video-metadata
def yt_get_artist_and_track(url):
    ydl = youtube_dl.YoutubeDL({})
    with ydl:
        video = ydl.extract_info(url, download=False)
    song = { 
        'artist': video['artist'], 
        'track': video['track'] 
    }
    return song

def spotify_auth():
    token = util.prompt_for_user_token('mentallyfreetobe@gmail.com', 'user-read-email', client_id=keys.SPOTIPY_CLIENT_ID, client_secret=keys.SPOTIPY_CLIENT_SECRET,redirect_uri=keys.SPOTIPY_REDIRECT_URI)
    sp = spotipy.Spotify(auth=token)
    # print(sp.me())
    # print(token)
    # return (token)
    return sp

if __name__ == '__main__':
    app.run(debug=True)