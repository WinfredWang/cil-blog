var express = require('express');
var router = express.Router();
var ArticleDao = require('../model/article').ArticleDao;

router.get('/url', function(req, res, next){
  console.log('url');
  res.jsonp([{name:'Home', url:'article'}, {name:'About', url:'about'}]);
});

router.get('/article', function(req, res, next){
  ArticleDao.find(null, function(err, articles) {
    res.jsonp(articles);
  });
});

router.get('/article/:id', function(req, res, next){
  var id = req.params.id;
console.log(id);
  ArticleDao.find(id, function(err, article) {
    res.jsonp(article);
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