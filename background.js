console.log("background running");

chrome.browserAction.onClicked.addListener(function (tab) {
    let msg = {
        txt: "hello"
    }
    chrome.tabs.sendMessage(tab.id, msg);
});