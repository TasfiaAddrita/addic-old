console.log("background running");

var background = {
    sendJSON: function(data) {
        // var xhr = new XMLHttpRequest();
        // url = "http://127.0.0.1:5000/receivejson";
        // xhr.open("POST", url, true);
        // xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // xhr.send(JSON.stringify(data));
        // console.log(data)
        console.log(data)
    },

    listener: function() {
        chrome.runtime.onMessage.addListener(function (message, sender, response) {
            console.log(message)
            // this.sendJSON(message)
        })
    }
}

background.listener()