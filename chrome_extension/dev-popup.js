var bkg = chrome.extension.getBackgroundPage();
// bkg.console.log('---popup.js---')

function hello() {
  return "Hello world";
}

let spotAuthBtn = document.getElementById('spotifyAuth')
spotAuthBtn.onclick = function() {
    chrome.extension.sendMessage({
        action: "launchOauth"
  })
}

let getAuthToken = document.getElementById("getAuthToken");
getAuthToken.onclick = function() {
  chrome.storage.local.get(["SPOTIFY_ACCESS_TOKEN"], function(result) {
    bkg.console.log("auth token " + result.SPOTIFY_ACCESS_TOKEN);
  });
};

let resetAuthToken = document.getElementById("resetAuthToken");
resetAuthToken.onclick = function() {
  chrome.storage.local.set({ SPOTIFY_ACCESS_TOKEN: "" }, function() {
    bkg.console.log("reset SPOTIFY_ACCESS_TOKEN");
  });
};