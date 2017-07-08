var express = require('express');
var router = express.Router();
const userValidator = require('./login');

router.get('/url', function (req, res, next) {
    var user = req.query.u;

    if (user == 'admin' && userValidator.validateUser(req, res)) {
        res.jsonp([{ name: '首页', url: 'manage' }, { name: '写博客', url: 'post' }]);
    } else {
        res.jsonp([{ name: '首页', url: 'article' }, { name: '关于', url: 'about' }]);
    }
});

module.exports = router;