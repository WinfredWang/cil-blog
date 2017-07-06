var express = require('express');
var router = express.Router();
var session = require('express-session');


router.post('/login', function(req, res, next){
  var email = req.param('email');
  var pwd = req.param('pwd');

  if (email == "wang") {
    req.session.data= true;
    res.jsonp({status:0});  
  } else {
    res.jsonp({status:1});  
  }

});

router.post('/islogin', function(req, res, next) {
    if (req.session.data) {
       res.jsonp({status:0});  
    } else {
       res.jsonp({status:1});  
    }
});

module.exports = router;