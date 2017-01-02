var mongo = require('./config').mongo;

var ArticleSchema = mongo.Schema({
    title: String,
    content: String
})
var articleModel = mongo.model('Article',ArticleSchema)

var ArticleDao = {
    add:function(article, callback) {
        var a = new articleModel(article);
        a.save(callback);
    },
    del: function(article, callback) {
        articleModel.remove(article, callback);
    },
    find:function(callback) {
        articleModel.find(callback);
    },
    update: function(id, article, callback) {
        articleModel.update({'_id':user.id}, { $set: article}, callback);
    }
}; 


exports.ArticleDao = ArticleDao;