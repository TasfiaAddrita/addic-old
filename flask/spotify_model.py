import spotipy
import spotipy.util as util
from spotipy import oauth2
from youtube_model import YouTube
import keys

class Spotify():
    def __init__(self, yt_track_string=None):
        self.user = None
        self.yt_track_string = yt_track_string
    
    def spotify_new_auth():
        pass

    # get user authorization
    def spotify_auth(self):
        token = util.prompt_for_user_token(
            'mentallyfreetobe@gmail.com', 
            keys.SCOPE, 
            client_id = keys.SPOTIPY_CLIENT_ID, 
            client_secret = keys.SPOTIPY_CLIENT_SECRET,
            redirect_uri = keys.SPOTIPY_REDIRECT_URI
        )

        self.user = spotipy.Spotify(auth=token)
    
    def set_track(self, yt_url):
        self.yt_track_string = yt_url

    # search if song is in Spotify's db 
    # if yes, get track id
    # TODO -- if no, return "unavailable"
    def get_track_id(self):
        spotify_track_info = self.user.search(self.yt_track_string, limit=1)
        spotify_track_id = spotify_track_info["tracks"]["items"][0]["id"]
        return [spotify_track_id]

    # check if track is in user's Liked Songs list
    def check_track(self):
        track_id = self.get_track_id()
        return self.user.current_user_saved_tracks_contains(track_id)[0]
    
    # add track to user's Liked Songs list
    def add_track(self):
        track_id = self.get_track_id()
        self.user.current_user_saved_tracks_add(track_id)