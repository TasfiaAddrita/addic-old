console.log("Chrome Extension ready to go");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var test = document.getElementsByClassName("title");
    console.log(test[0])
    var h = document.getElementsByClassName("title");
    h[0].insertAdjacentHTML("afterbegin", "<button>Add to Spotify</button>");
});