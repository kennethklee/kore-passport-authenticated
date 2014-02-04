kore-passport-authenticated
====================

Tools for ensuring the session is authenticated or not.

Usage
-----

Ensure authenticated.

```
var authenticated = require('kore-passport-authenticated').authenticated;

app.get('/', authenticated(), function(req, res) {
  res.send('An authenticated session will see this message.');
});

app.get('/redirect', authenticated({redirect: '/'}), function(req, res) {
  res.send('An un-authenticated request will redirect to /');
});

app.get('/rendor', authenticated({render: 'template'}), function(req, res) {
  res.send('An un-authenticated request will render the view "template" with a dictionary variable url that contains the request url');
});
```

The same arguments are accepted for `notauthenticated`.

Note that `notAuthenticated` is an alias of `notauthenticated` and can also be used.

```
var notauthenticated = require('kore-passport-authenticated').notauthenticated;
```

Lastly, the `onfail` handler can be overritten if you like. `onfail` looks like the following:

```
exports.onFail = exports.onfail = function(opt, req, res) {
    if (opt.redirect) {
        return res.redirect(opt.redirect);
    } else if (opt.render) {
        return res.render(opt.render, {url: req.url});
    }

    return res.send(404);
}
```

