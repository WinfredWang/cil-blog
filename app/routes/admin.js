var express = require('express');
var router = express.Router();
var session = require('express-session');

const userValidator = require('./login');

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

module.exports = router;