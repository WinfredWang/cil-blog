var mongo = require('./config').mongo;

var ArticleSchema = mongo.Schema({
    title: String,
    content: String
})
var articleModel = mongo.model('Article', ArticleSchema)

var ArticleDao = {
    add: function (article, callback) {
        var a = new articleModel(article);
        a.save(callback);
    },
    remove: function (id, callback) {
        articleModel.findByIdAndRemove(id, callback);
    },
    find: function (id, callback) {
        if (id) {
            articleModel.find({ '_id': id }, callback)
        } else {
            articleModel.find(callback);
        }
    },
    findById: function (id, callback) {
        articleModel.findById(id, callback);
    },
    update: function (id, article, callback) {
        articleModel.update({ '_id': id }, { $set: {title:article.title, content:article.content} }, callback);
    },
    addOrUpdate: function (article, callback) {
        if (article._id) {
            articleModel.findById(article._id, (err, a) => {
                if (err) {
                    this.add(article._id, callback);
                } else {
                    this.update(article._id, article, callback);
                }
            })
        } else {
            this.add(article, callback);
        }
    }
};


exports.ArticleDao = ArticleDao;