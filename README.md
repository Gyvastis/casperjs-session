# CasperJS Session

###A simple implementation of what should have been an essential feature of CasperJS

I have struggled to find an attractive solution of CasperJS session handling. Thus I have assembled together something rather simple but effective.

Firstly, you have to define CasperJS Session requirement. `casperjs-session.js` can be placed in the same folder your script is called from.
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
* `sessionInit` loads session from `cookies.txt` (you can define a different filename by passing it to `sessionInit` function). It returns `true` if any cookies were loaded (it doesn't check expiration dates).
* `sessionInit` calls `sessionLoad` which gathers cookies from the default cookie file. Every time cookies are loaded their expiration date is renewed.
* `sessionSave` rewrites previously saved session.
* `sessionDestroy` simply empties default session cookie file.
