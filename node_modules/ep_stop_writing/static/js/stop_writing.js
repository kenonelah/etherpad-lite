if(typeof exports == 'undefined'){
  var exports = this['mymodule'] = {};
}

exports.handleClientMessage_CUSTOM = function(hook, context, wut){
  if(context.payload.authorId !== pad.getUserId()){ // if its not sending to self
    if(context.payload.action === 'requestSTOP'){ // someone has requested we approve their stop_writing request - we recieved an offer
      stop_writing.showStop();
    }
    if(context.payload.action === 'requestCONTINUE'){ // someone has requested we approve their stop_writing request - we recieved an offer
      stop_writing.hideStop();
    }
  }
}

var stop_writing = {

  /****
  * Begin initiating events to prepare the DOM for Video chat support
  *****/
  init: function(){
    this.listeners();
  },

  /****
  * Send a request to negotiate stop_writing to a target client through the server.. 
  *****/
  sendRequest: function(isHiding){
    var authorId = pad.getUserId();
    var padId = pad.getPadId();
    if ( $('#stopWriting').text() == "Stop writing" ){
      var isSTOP = false;
      $('#stopWriting').text("Continue writing");
    }else{
      var isSTOP = true;
      $('#stopWriting').text("Stop writing");
    }

    // Create a REQUEST message to send to the server
    if(!isSTOP){ // if we're not already hiding
      var message = {
        type : 'stop_writing',
        action : 'requestSTOP',
        padId : padId,
        authorId : authorId
      }
    }else{
      var message = {
        type : 'stop_writing',
        action : 'requestCONTINUE',
        padId : padId,
        authorId : authorId
      }
    }
    pad.collabClient.sendMessage(message);  // Send the request through the server to create a tunnel to the client
  },

  /****
  * Update UI when we go into a chat
  *****/
  showStop: function(){
    if( $('#stop_writing').length === 0 ){
      $('body').append("<div id='stop_writing'>Stop Writing<br/></div>");
    }
    $('#stop_writing').show();
  },

  /****
  * Update UI when we leave a chat
  *****/
  hideStop: function(){
    $('#stop_writing').hide();
  },

  /****
  * Click event handlers
  *****/
  listeners: function(e){
    $('#stopWriting').click(function(){
      stop_writing.sendRequest();
    });
  }
}

