function appendVideo(data){
    //  add the returned video to the list with play and delete buttons
    $('<li>'+ data.artist + '  -  ' + data.title + '  <button class="playVid" data-id="'+ data.id +'"> PLAY </button>' + '   <button class="deleteVid" data-id="'+ data.id +'"> DELETE </button>' + '</li>').prependTo("#video-list")
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

// -------------   show the video and details to the page ---------

  // when someone clicks to play a video then make ajax request to spotifiy with info pulled from the database.
  function showVideoInfo(event) {
    var itemId = $(this).data('id');
    console.log(itemId)
    $.ajax({
      type: "get",
      url: "/videos/" + itemId,
      datatype: 'json'
    }).done(function(data){
      console.log(data)
    })
  }


// ------- end of show the video and details to the page ----------


$(document).ready(function() {
    // list videos in database --
    getVideos();
    // -- show the video and details to the page ---------
    $('#video-list').on('click', '.playVid', showVideoInfo);

  // $('#video-list').on('click', '.deleteVid', deleteVideo);

})
