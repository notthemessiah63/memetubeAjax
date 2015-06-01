function appendNewItem(data){
    //  uses ternery operator, and if data.done = 't' append 'completed' otherwise ''
    $('<li class="'+ (data.done == 't' ? "completed" : "") + '">'+
      '<input class="toggle" type="checkbox" data-id="'+ data.id +'" '+ (data.done == 't' ? 'checked="checked"' : "") + '>'+
      '<label>'+ data.item +'</label>'+
      // data.id holds an id so we can match to database - newest at the top.
      '<button class="destroy" data-id="'+ data.id +'"></button>'+
    '</li>').prependTo("#todo-list")

}

function deleteDisplayItem(data){
    //  uses ternery operator, and if data.done = 't' append 'completed' otherwise ''
    console.log('remove the <li> ')
}

function getItems() {
  // Ajax request to retriev all the items
  $.ajax({
    type: 'get',
    url: '/items',
    datatype: 'json'
  }).done(function(data){
    $.each(data, function(index, item){
      appendNewItem(item);
      // console.log(data);
    })
  })
}
function createItem() {
  console.log('create item')
  var itemData = $('#new-todo').val()
  $.ajax({
    type: 'post',
    url: '/items',
    dataType: 'json',
    data: {item: itemData}
  }).done(function(data){
    appendNewItem(data);
    $('#new-todo').val('');
  })
}

function changeItemStatus () {
  var inputBox = $(this);
  var itemId = $(this).data('id');
  var isDone = $(this).is(":checked");
  $.ajax({
    type: "put",
    url: "/items/" + itemId,
    data: {done: isDone},
    datatype: 'json'
  }).done(function(data){
    console.log(data)
    inputBox.parent().toggleClass('completed');
  })
}

function deleteItem () {
  console.log("delete the item")
  var itemId = $(this).data('id'); 
  $.ajax({
    type: "delete",
    url: "/items/" + itemId,
    datatype: 'json'
  }).done(function(data){
    inputBox.parent().destroyClass('deleted');
  }).done(function(data){
    deleteDisplayItem(data);
  })

}


$(document).ready(function() {
  getItems();
  $('#new-todo').on('keypress', function(event){
    if(event.which === 13) {
      createItem();
    }
    // console.log(event);
  })
  // we need to use event delegation here because li.toggle is not on the page when it loads, therefore we have to attach the event listener to #todo-list
  $('#todo-list').on('change', '.toggle', changeItemStatus);
  $('#todo-list').on('click', '.destroy', deleteItem);
})