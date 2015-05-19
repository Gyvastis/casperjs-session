var require = patchRequire(require);

var utils = require('utils');
var fs = require('fs');

var cookie_file = 'cookies.txt';

exports.loadCookies = function(file = '') {
  var cookies = [];
  var data;

  if(file == ''){
    file = cookie_file;
  }

  if (fs.exists(file)) {
    data = fs.read(file).trim();
    if (data.length <= 0) {
      return false;
    }

    cookies = fs.read(file).split("\r\n");
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
  } else {
    console.log("Unable to load cookies from '" + file + "'. File doesn't exist", "warning");
  }

  return cookies;
};

// // exports.saveCookies = function(casper, file) {
// exports.saveCookies = function(file = '') {
//   var file_content = '';
//
//   if(file == ''){
//     file = cookie_file;
//   }
//   // casper.page.cookies.forEach(function(cookie) {
//   phantom.cookies.forEach(function(cookie) {
//     return file_content += utils.format("%s\t%s\t%s\t%s\t%s\t%s\t%s\r\n", cookie.domain, 'TRUE', cookie.path, 'FALSE', cookie.expiry, cookie.name, cookie.value);
//   });
//   return fs.write(file, file_content, 'w');
// };
