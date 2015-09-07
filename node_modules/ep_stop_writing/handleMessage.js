/***
*
* Responsible for negotiating messages between two clients
*
****/

var authorManager = require("../../src/node/db/AuthorManager"),
padMessageHandler = require("../../src/node/handler/PadMessageHandler"),
            async = require('../../src/node_modules/async');

/* 
* Handle incoming messages from clients
*/
exports.handleMessage = function(hook_name, context, callback){
  // Firstly ignore any request that aren't about STOP writing
  var isStopMessage = false;
  if(context){
    if(context.message && context.message){
      if(context.message.type === 'COLLABROOM'){
        if(context.message.data){ 
          if(context.message.data.type){
            if(context.message.data.type === 'stop_writing'){
              isStopMessage = true;
            } 
          }
        }
      }
    }
  }
  if(!isStopMessage){
    callback(false);
    return false;
  }

  var message = context.message.data;
  /***
    What's available in a message?
     * action -- The action IE request, accept
     * padId -- The padId of the pad both authors are on
     * myAuthorId -- The Id of the author who is sending the stop message
  ***/
  if(message.action === 'requestSTOP'){
    var msg = {
      type: "COLLABROOM",
      data: { 
        type: "CUSTOM",
        payload: {
          authorId: message.authorId,
          action: "requestSTOP",
          padId: message.padId
        }
      }
    };
    sendToTarget(message, msg);
  }

  if(message.action === 'requestCONTINUE'){
    var msg = {
      type: "COLLABROOM",
      data: {
        type: "CUSTOM",
        payload: {
          authorId: message.authorId,
          action: "requestCONTINUE",
          padId: message.padId
        }
      }
    };
    sendToTarget(message, msg);
  }

  if(isStopMessage === true){
    callback([null]);
  }else{
    callback(true);
  }
}


function sendToTarget(message, msg){
  var sessions = padMessageHandler.sessioninfos;
  // TODO: Optimize me
  Object.keys(sessions).forEach(function(key){
    var session = sessions[key]
    padMessageHandler.handleCustomObjectMessage(msg, key, function(){
      // TODO: Error handling
    }); // Send a message to this session
  });
}
