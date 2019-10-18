import spotipy
import spotipy.util as util
# from spotipy import oauth2
# from rauth import OAuth2Service

from youtube_model import YouTube
import keys

class Spotify():
    def __init__(self, yt_track_string=None):
        self.user = None
        self.yt_track_string = yt_track_string
        self.track_id = None
    
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
    def get_track_id(self):
        spotify_query_response = self.user.search(self.yt_track_string, limit=1)
        spotify_track = spotify_query_response["tracks"]["items"]
        if len(spotify_track) == 0:
            return []
        else:
            spotify_track_id = spotify_query_response["tracks"]["items"][0]["id"]
            # return [spotify_track_id]
            self.track_id = [spotify_track_id]

    # check if track is in user's Liked Songs list
    def check_track_in_user_lib(self):
        # track_id = self.get_track_id()
        return self.user.current_user_saved_tracks_contains(self.track_id)[0]
    
    # add track to user's Liked Songs list
    def add_track(self):
        # track_id = self.get_track_id()
        self.user.current_user_saved_tracks_add(self.track_id)