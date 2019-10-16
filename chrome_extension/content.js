console.log("Chrome Extension ready to go");

// var contentScript = {
//     getSongTitleAndArtist: function(video_id) {
//         // var song_content = title.split("-")
//         // this.message(song_content)
        
//     },

//     message: function(content) {
//         chrome.runtime.sendMessage(
//             {
//                 from: 'contentScript'
//                 // content_one: content[0],
//                 // content_two: content[1]
//             }
//         );
//     }
// }

window.addEventListener('load', function () {
    var video_title = document.getElementsByClassName("title style-scope ytd-video-primary-info-renderer")[0];

    video_title.insertAdjacentHTML("afterbegin", "<button class=\'spotify\' >Add to Spotify</button>");
    // contentScript.message()
    chrome.runtime.sendMessage({from: 'contentScript'});
})