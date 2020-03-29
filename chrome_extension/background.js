function hello() {
    return "Hello world";
}

console.log(hello())

// ------------------------------------------------------------------------------------
// https://github.com/rarkebauer/KEY-BPMFINDER/blob/master/eventPage.js

function makeXhrPostRequest(code, grantType, refreshToken){
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://accounts.spotify.com/api/token', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300){
          return resolve(xhr.response);
      } else {
        reject(Error(JSON.stringify({
          status: xhr.status,
          statusTextInElse: xhr.statusText
        })))
      }
    }

    xhr.onerror = function() {
      reject(Error({
        status: xhr.status,
        statusText: xhr.statusText
      }))
    }

    let requestBody = refreshToken ? `grant_type=${grantType}&refresh_token=${refreshToken}&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}` : `grant_type=${grantType}&code=${code}&redirect_uri=${SPOTIFY_REDIRECT_URI}&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`;

    xhr.send(requestBody)
  })
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
  if (request.action === 'launchOauth'){
    chrome.identity.launchWebAuthFlow(
      {
        url:
          "https://accounts.spotify.com/authorize" +
          `?client_id=${SPOTIFY_CLIENT_ID}` +
          "&response_type=code" +
          `&redirect_uri=${SPOTIFY_REDIRECT_URI}`,
        interactive: true
      },
      function(redirectUrl) {
        // console.log(redirectUrl)
        let code = redirectUrl.slice(redirectUrl.indexOf("=") + 1);

        makeXhrPostRequest(code, "authorization_code")
          .then(data => {
            data = JSON.parse(data);
            chrome.storage.local.set({ SPOTIFY_ACCESS_TOKEN: data["access_token"] }, function() {
                // console.log("saved spotify access token" + SPOTIFY_ACCESS_TOKEN);
                console.log("saved spotify access token " + data["access_token"]);
            });
            // console.log(data)
            // get_lauv_albums(data["access_token"])
            // console.log(SPOTIFY_ACCESS_TOKEN);
            // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            //   if (
            //     (changeInfo.status === "complete" &&
            //       tab.url.indexOf("spotify") > -1) ||
            //     (changeInfo.status === "complete" &&
            //       tab.url.indexOf("spotify") > -1 &&
            //       tab.url.indexOf("user") > -1 &&
            //       tab.url.indexOf("playlists") === -1)
            //   ) {
            //     chrome.tabs.query(
            //       { active: true, currentWindow: true },
            //       function(tabs) {
            //         chrome.tabs.sendMessage(tabs[0].id, { token: data.access_token }, function(response) {
            //             console.log("response is ", response);
            //           }
            //         );
            //       }
            //     );
            //   }
            // });
            return data;
          })
          .catch(err => console.error(err));
      }
    ); // launch web auth flow
  } // if statment
}) // extension event listener

// ------------------------------------------------------------------------------------

function get_lauv_albums(SPOTIFY_ACCESS_TOKEN) {
    var Spotify = require("spotify-web-api-js");
    var spotifyApi = new Spotify();

    spotifyApi.setAccessToken(SPOTIFY_ACCESS_TOKEN);

    // get Lauv's albums, using Promises through Promise, Q or when
    spotifyApi.getArtistAlbums("5JZ7CnR6gTvEMKX4g70Amv").then(
        function(data) {
            console.log("Artist albums", data);
        },
        function(err) {
            console.error(err);
        }
    );
    // chrome.storage.local.set({SPOTIFY_ACCESS_TOKEN: SPOTIFY_ACCESS_TOKEN}, function() {
    //     console.log('saved spotify access token' + SPOTIFY_ACCESS_TOKEN)
    // })
    chrome.storage.local.get(["SPOTIFY_ACCESS_TOKEN"], function(result) {
      console.log(result.SPOTIFY_ACCESS_TOKEN);
    });

}