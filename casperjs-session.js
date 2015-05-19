var require = patchRequire(require);

var utils = require('utils');
var fs = require('fs');

var cookie_file = 'cookies.txt';

exports.sessionInit = function(file){
  if(typeof file !== "undefined"){
    cookie_file = file;
  }

  if ( ! fs.exists(cookie_file)) {
    fs.write(cookie_file, '', 'w');
  }

  var cookies = sessionLoad();

  return cookies.length > 0;
};

var sessionLoad = function() {
  var cookies = [];
  var data;

  data = fs.read(cookie_file).trim();
  if (data.length <= 0) {
    return false;
  }

  cookies = fs.read(cookie_file).split("\r\n");
  cookies.forEach(function(cookie) {
    var detail = cookie.split("\t");

    var newCookie = {
      'name': detail[5],
      'value': detail[6],
      'domain': detail[0],
      'path': detail[2],
      'httponly': false,
      'secure': false,
      'expires': (new Date()).getTime() + 3600 * 24 * 30
    };

    return phantom.addCookie(newCookie);
  });

  return cookies;
};

exports.sessionSave = function() {
  var file_content = '';

  phantom.cookies.forEach(function(cookie) {
    // return file_content += utils.format("%s\t%s\t%s\t%s\t%s\t%s\t%s\r\n", cookie.domain, 'TRUE', cookie.path, 'FALSE', cookie.expiry, cookie.name, cookie.value);
    return file_content += utils.format("%s\t%s\t%s\t%s\t%s\t%s\t%s\r\n", cookie.domain, 'TRUE', cookie.path, 'FALSE', (new Date()).getTime() + 3600 * 24 * 30, cookie.name, cookie.value);
  });

  return fs.write(cookie_file, file_content, 'w');
};

exports.sessionDestroy = function(){
  fs.write(cookie_file, '', 'w');
};
