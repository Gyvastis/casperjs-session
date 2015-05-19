# CasperJS Session

###A simple implementation of what should have been an essential feature for CasperJS.

I have struggled to find an attractive solution of CasperJS session handling. Thus I have assembled together something rather simple but effective.

Firstly, you have to define CasperJS Session requirement. CasperJS Session file can be placed in the same folder your script is called from.
```javascript
var session = require('casperjs-session');
```

And here's an example of use:
```javascript
var logged_in = session.sessionInit();

if( ! logged_in){
  // do something to login and then save session
  session.sessionSave();
}
else{
  // already logged_in
}
```

To destroy session simply do this:
```javascript
session.sessionDestroy();
```

Something worth noting:
* By default session is stored in `cookies.txt` file. You can pass a different file name to `sessionInit` function
* `sessionInit` loads session from default cookie file. It returns `true` if any cookies were loaded.
* `sessionInit` calls `sessionLoad`, which gathers session from the cookie file. Every time session is loaded cookie expiration date is renewed.
* `sessionSave` rewrites previously saved session
* `sessionDestroy` simply empties default session cookie file.
