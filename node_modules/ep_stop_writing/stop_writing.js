var eejs = require('ep_etherpad-lite/node/eejs/');
var settings = require('ep_etherpad-lite/node/utils/Settings');
var checked_state = '';

exports.eejsBlock_mySettings = function (hook_name, args, cb) {
  var checked_state = 'checked';
  if(settings.ep_stop_writing){
    if (settings.ep_stop_writing.disable_by_default === true){
      checked_state = 'unchecked';
    }else{
      checked_state = 'checked';
    }
  }
  args.content = args.content + eejs.require('ep_stop_writing/templates/stop_writing_entry.ejs', {checked : checked_state});
  return cb();
}

exports.eejsBlock_styles = function (hook_name, args, cb){
  args.content = args.content + '<link href="../static/plugins/ep_stop_writing/static/css/stop_writing.css" rel="stylesheet">';
}

exports.eejsBlock_scripts = function (hook_name, args, cb){
  args.content = '<script src="../static/plugins/ep_stop_writing/static/js/stop_writing.js"></script>' + args.content;
}

exports.eejsBlock_editbarMenuRight = function (hook_name, args, cb){
  args.content = eejs.require('ep_stop_writing/templates/stop_writing_editbar.ejs') + args.content;
}
