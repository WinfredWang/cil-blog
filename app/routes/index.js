var express = require('express');
var router = express.Router();
var UserDao = require('../model/user').UserDao;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user', function(req, res, next) {
  UserDao.find(function(err, users) {
    res.jsonp(users);
  });

});
router.delete('/user/:id', function(req, res, next) {
  

   var id = req.params.id;
  console.log(id);
  UserDao.del({_id:id}, function(err) {

    if (err) {
       res.jsonp(err);
    } else {
      res.jsonp(null);
    }
      
  });
});

router.post('/user/add', function(req, res, next) {
var name = req.param('name');
var pwd = req.param('pwd');

  UserDao.add({ name: name,pwd: pwd }, function(err) {
    if(err) {
      res.jsonp(err);
    } else {
      res.jsonp({'msg':'sucesss'});  
    }
  })
  
});
module.exports = router;
