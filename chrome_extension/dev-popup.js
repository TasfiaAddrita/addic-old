// var bkg = chrome.extension.getBackgroundPage();
// const promise = new Promise(function(resolve, reject) {
//     bkg.console.log("---popup.js---");  
    
//     let spotAuthBtn = document.getElementById('spotifyAuth')
//     bkg.console.log(spotAuthBtn)
//     spotAuthBtn.onclick = function() {
//         chrome.extension.sendMessage({
//             action: "launchOauth"
//         })
//     }
// })

// promise.then({})

var bkg = chrome.extension.getBackgroundPage();
bkg.console.log('---popup.js---')

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
    bkg.console.log(result.SPOTIFY_ACCESS_TOKEN);
  });
};