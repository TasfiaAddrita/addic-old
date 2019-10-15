console.log("background running");

chrome.browserAction.onClicked.addListener(function (tab) {
    // console.log("button clicked!");
    // console.log(tab);
    let msg = {
        txt: "hello"
    }
    chrome.tabs.sendMessage(tab.id, msg);
});