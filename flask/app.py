from flask import Flask, request, redirect, url_for, jsonify
from flask_cors import CORS
import youtube_dl
import spotipy
import spotipy.util as util
from spotipy import oauth2
import webbrowser
import keys

app = Flask(__name__)
CORS(app)

sp_oauth = oauth2.SpotifyOAuth(keys.SPOTIPY_CLIENT_ID, keys.SPOTIPY_CLIENT_SECRET, keys.SPOTIPY_REDIRECT_URI,scope=keys.SCOPE, cache_path='.spotipyoauthcache')


@app.route('/')
def index():
    return "hello"

@app.route('/receivejson', methods=["POST"])
def get_json():
    yt_url = request.get_json()

    user = spotify_auth()
    song_id = spotify_search(user, yt_url)

    if check_track(user, song_id):
        response = "already saved"
    else:
        spotify_add_track(user, song_id)
        response = "added song"
    return jsonify(response)

# https://stackoverflow.com/questions/50711867/youtube-api-retrieve-music-in-this-video-info-from-video-metadata
def yt_get_artist_and_track(url):
    ydl = youtube_dl.YoutubeDL({})
    with ydl:
        video = ydl.extract_info(url, download=False)
    song = video['artist'] + " " + video['track'] 
    return song

def spotify_new_auth():
    pass

# get user authorization
def spotify_auth():
    token = util.prompt_for_user_token(
        'mentallyfreetobe@gmail.com', 
        keys.SCOPE, 
        client_id = keys.SPOTIPY_CLIENT_ID, 
        client_secret = keys.SPOTIPY_CLIENT_SECRET,
        redirect_uri = keys.SPOTIPY_REDIRECT_URI
    )

    sp = spotipy.Spotify(auth=token)
    return sp

# check if track is in user's Liked Songs list
def check_track(user, track_id):
    return user.current_user_saved_tracks_contains(track_id)[0]

# add tracj to user's Liked Songs list
def spotify_add_track(user, track_id):
    user.current_user_saved_tracks_add(track_id)
    print(check_track(user, track_id))

# search if song is available in spotify
def spotify_search(user, url):
    song = yt_get_artist_and_track(url)
    spotify_track_info = user.search(song, limit=1)
    spotify_track_id = spotify_track_info["tracks"]["items"][0]["id"]
    return [spotify_track_id]

if __name__ == '__main__':
    app.run(debug=True)