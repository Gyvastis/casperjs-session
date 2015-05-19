# CasperJS Session

##A simple implementation of what should have been an essential feature for CasperJS.

I have struggled to find an attractive solution for CasperJS session handling. Thus I have assembled together something rather simple but effective.

Firstly, you have to define CasperJS Session requirement:
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
