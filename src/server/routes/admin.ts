import * as express from "express";
import * as userValidator from "./login";
import * as session from "express-session";

var router = express.Router();

router.post('/login', function (req, res, next) {
  var email = req.param('email');
  var pwd = req.param('pwd');

  if (email == "wang") {
    userValidator.login(email, req, res);
    res.jsonp({ status: 0 });
  } else {
    res.jsonp({ status: 1 });
  }

});


router.post('/validate', function (req, res, next) {
  if (userValidator.validateUser(req, res)) {
    res.jsonp({ status: 0 });
  } else {
    res.jsonp({ status: 1 });
  }
});

export = router;