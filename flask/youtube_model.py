import youtube_dl

class YouTube():
    def __init__(self, url):
        self.url = url
    
    # https://stackoverflow.com/questions/50711867/youtube-api-retrieve-music-in-this-video-info-from-video-metadata
    def get_artist_and_track(self):
        ydl = youtube_dl.YoutubeDL({})
        with ydl:
            video = ydl.extract_info(self.url, download=False)
        song = video['artist'] + " " + video['track'] 
        return song