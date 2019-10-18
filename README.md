# addic

## Description
Chrome extension that allows you to add music to your Spotify "Liked Songs" list from Youtube.

## Goals
### MVP
- [x] Get user authorization via Spotify API
- [x] Add a button next to Youtube video title
- [x] When button is clicked, it returns the song title and artist
- [x] Search song on Spotify
- [x] Add song to user's Spotify "Liked Songs" list

### Long term goals
- [ ] Refactor code to use express.js instead of Flask
- [ ] Show button only in videos that contain music
- [ ] Check if song in Youtube video is in user's "Liked Songs" list
    - [ ] If it is, give user option to remove it from the list
- [ ] Give user option to save song in a playlist
- [ ] Add YouTube playlists 
- [ ] Offer other streaming services (Apple Music, Google Play, etc.)

## How to run/setup
Clone repo 
```git clone "https://github.com/TasfiaAddrita/addic"```

Go to "flask" directory, run these two commands:
```pipenv install -e Pipfile```
```python3 app.py```

## How to deploy
Go to Google Chrome > chrome://extensions > toggle Developer Mode > click "Load unpacked" > navigate to where the addic/chrome_extension folder is in your system and select it 

Open https://www.youtube.com and go to a random song (that's not saved in your Spotify "Liked Songs" list) and press "Add to Spotify" button. If button does not show up or song isn't added, refresh the page a few times. As of now, the song is only added to my (Tasfia) liked songs list, but hopefully that'll be fixed in the near future.

## Live deployments
Hopefully in the Chrome Extension Store in the near future!

## How to contribute
Reach out to me at tasfia.addrita@gmail.com

## Resources
External resources used and needed for this project to be completed. Always cite your peer developers!
