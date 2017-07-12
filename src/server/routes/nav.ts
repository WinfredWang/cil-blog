import * as express from "express";
import * as userValidator from "./login";

let router = express.Router();

router.get('/url', function (req, res, next) {
    var user = req.query.u;

    if (user == 'admin' && userValidator.validateUser(req, res)) {
        res.jsonp([{ name: '首页', url: 'manage' }, { name: '写博客', url: 'post' }]);
    } else {
        res.jsonp([{ name: '首页', url: 'article' }, { name: '关于', url: 'about' }]);
    }
});

export = router;