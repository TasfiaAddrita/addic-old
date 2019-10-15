console.log("Chrome Extension ready to go");
// alert("I work")

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request, sender, sendResponse);
    // console.log("I work")
});