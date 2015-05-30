function appendVideo(data){
    //  add the returned video to the list with play and delete buttons
    $('<li>'+ data.artist + '  -  ' + data.title + '<button class="playVid" data-id="'+ data.id +'"></button>' + '<button class="deleteVid" data-id="'+ data.id +'"></button>' + '</li>').prependTo("#video-list")
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
  
  // $('#video-list').on('click', '.playVid', playVideo);

  // $('#video-list').on('click', '.deleteVid', deleteVideo);

})
