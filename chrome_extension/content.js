console.log("Chrome Extension ready to go");

content = {

    addButton: function() {
        window.addEventListener('load', function () {
            var video_title = document.getElementsByClassName("title style-scope ytd-video-primary-info-renderer")[0];
            video_title.insertAdjacentHTML("afterbegin", "<button id=\'spotify\' >Add to Spotify</button>");
            
            chrome.runtime.sendMessage({from: 'content', subject: 'spotify-connection'});

            var button = document.getElementById('spotify')
            button.addEventListener("click", function() {
                console.log("button clicked")
                chrome.runtime.sendMessage({from: 'content', subject: 'add-song'});
            });
        })
        // console.log("content running")
        // chrome.runtime.sendMessage({from: 'contentScript'});
    },

    listener: function() {
        chrome.runtime.onMessage.addListener(function (message, sender, response) {
            if (message.from == 'background' && message.subject == 'song already saved') {
                // console.log(message.subject);
                var button = document.getElementById('spotify')
                button.innerHTML = "Delete from Spotify"
            }
        });
    },

    run: function() {
        content.addButton();
        content.listener();
    }
}

content.run()