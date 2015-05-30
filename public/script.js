function appendVideo(data){
    console.log("append video")
    //  add the returned video to the list
    $('<li>'+ data.artist + data.title + '</li>').prependTo("#video-list")
}
function getVideos() {
  // Ajax request to retrieve all the items
  $.ajax({
    type: 'get',
    url: '/videos',
    datatype: 'json'
  }).done(function(data){
    $.each(data, function(index, artist, title){
      appendVideo(artist, title);
    })
  })
}



$(document).ready(function() {
  getVideos();

})
