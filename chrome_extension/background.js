console.log("background running");

var background = {

    listener: function() {
        chrome.runtime.onMessage.addListener(function (message, sender, response) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0]
                tabUrl = activeTab.url;
                // video_id = tabUrl.split("=");
                background.sendJSON(tabUrl);
            })
        });
    },

    sendJSON: function(data) {
        var xhr = new XMLHttpRequest();
        // var url = "http://127.0.0.1:5000/receivejson?video_id=" + data
        var url = "http://127.0.0.1:5000/receivejson"
        console.log(url)
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(JSON.stringify(data));
    }
}

background.listener()