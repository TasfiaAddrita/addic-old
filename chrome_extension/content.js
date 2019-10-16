console.log("Chrome Extension ready to go");

content = {

    addButton: function() {
        // window.addEventListener('load', function () {
        //     var video_title = document.getElementsByClassName("title style-scope ytd-video-primary-info-renderer")[0];
        //     video_title.insertAdjacentHTML("afterbegin", "<button class=\'spotify\' >Add to Spotify</button>");
        //     chrome.runtime.sendMessage({from: 'contentScript'});
        // })
        console.log("content running")
        chrome.runtime.sendMessage({from: 'contentScript'});
    },

    listener: function() {
        chrome.runtime.onMessage.addListener(function (message, sender, response) {
            if (message.from == 'background') {
                console.log(message);
            }
        });
    },

    run: function() {
        content.addButton();
        // content.listener();
    }
}

content.run()