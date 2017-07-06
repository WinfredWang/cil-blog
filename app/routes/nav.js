var express = require('express');
var router = express.Router();

router.get('/url', function(req, res, next){
    var user = req.query.u;
    if (user == 'admin' && req.session.data) {
         res.jsonp([{name:'xx', url:'xx'}]);
    } else {
        res.jsonp([{name:'首页', url:'article'}, {name:'关于', url:'about'}]);
    }
});

module.exports = router;