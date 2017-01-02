var express = require('express');
var router = express.Router();
var ArticleDao = require('../model/article').ArticleDao;

router.get('/url', function(req, res, next){
  console.log('url');
  res.jsonp([{name:'Home', url:'article'}, {name:'About', url:'about'}]);
});


router.get('/user', function(req, res, next) {
  

});

router.get('/article', function(req, res, next){
  //console.log('article');
  //res.jsonp([{ name: 'xx1', digest: 'texxx' , id:'1'}, { name: 'xx2', digest: 'adfasdfasd',id:'2'}]);

  ArticleDao.find(function(err, articles) {
    res.jsonp(articles);
  });
});

router.post('/save', function(req, res, next){
  var content = req.param('content');
  var title = req.param('title');

  ArticleDao.add({title:title, content:content},function(err) {
    if(err) {
      res.jsonp(err);
    } else {
      res.jsonp({'msg':'sucesss'});  
    }
  });
});

module.exports = router;