var express = require('express');
var router = express.Router();
var UserDao = require('../model/user').UserDao;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/url', function(req, res, next){
  console.log('url');
  res.jsonp([{name:'Home', url:'article'}, {name:'About', url:'about'}]);
});

router.get('/article', function(req, res, next){
  console.log('article');
  res.jsonp([{ name: 'xx1', digest: 'texxx' , id:'1'}, { name: 'xx2', digest: 'adfasdfasd',id:'2'}]);
});

router.post('/save', function(req, res, next){
  console.log(req.param('content'));
  res.jsonp({msg:'data'});
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
