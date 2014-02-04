exports.onFail = exports.onfail = function(opt, req, res) {
    if (opt.redirect) {
        return res.redirect(opt.redirect);
    } else if (opt.render) {
        return res.render(opt.render, {url: req.url});
    }

    return res.send(404);
} 

exports.authenticated = function(opt) {
    opt = opt || {};
    return function(req, res, next) {

        if (req.isAuthenticated()) {
            return next();
        }

        return exports.onfail(opt, req, res);
    };
};

exports.notAuthenticated = exports.notauthenticated = function(opt) {
    opt = opt || {};
    return function(req, res, next) {

        if (!req.isAuthenticated()) {
            return next();
        }

        return exports.onfail(opt, req, res);
    };
};