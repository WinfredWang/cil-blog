import * as express from "express";
import { ArticleDao } from '../model/article';

var router = express.Router();
router.get('/', function (req, res, next) {

  var p = new Promise(function (resolve, reject) {
    ArticleDao.find(null, function (err, articles) {
      resolve(articles);
      if (err) {
        reject(err)
      }
    });
  });
  p.then(function (value) {
    console.log('xx');
    res.jsonp(value)
  })
});

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  ArticleDao.find(id, function (err, article) {
    res.jsonp(article);
  });
});

router.post('/save', function (req, res, next) {
  var article = req.param('article');
  ArticleDao.addOrUpdate(article, function (err) {
    if (err) {
      res.jsonp(err);
    } else {
      res.jsonp({ 'msg': 'sucesss' });
    }
  });
});

router.delete('/del/:id', function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  ArticleDao.remove(id, (err) => {
    if (err) {
      res.jsonp({ 'msg': 'failed' });
    } else {
      res.jsonp({ 'msg': 'sucesss' });
    }
  });
});

export = router;