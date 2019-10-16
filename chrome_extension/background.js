console.log("background running");

var background = {

    listener: function() {
        chrome.runtime.onMessage.addListener(function (message, sender, response) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0]
                tabUrl = activeTab.url;
                background.sendJSON(tabUrl);
            })
        });
    },

    message: function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            // console.log(tabs[0].id)
            chrome.tabs.sendMessage(tabs[0].id, { from: 'background' });
        });
    },

    sendJSON: function(data) {
        var xhr = new XMLHttpRequest();
        var url = "http://127.0.0.1:5000/receivejson"
        console.log(url)
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(JSON.stringify(data));

        // receive data
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && this.status == 200) {
                receivedContent = JSON.parse(this.responseText)
                // console.log(receivedContent);
                // background.message();
                
            }
        };
    }
}


background.listener()