import { mongoose } from './config';
import { Article } from './model';
import { resolve } from 'url';

var ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    status: Number,
    readTime: Number,
    postDate: Date,
    lastModifyDate: Date
});

var articleModel = mongoose.model('Article', ArticleSchema);

class ArticleDAO {
    private articleModel;
    constructor() {
        this.articleModel = mongoose.model('Article', ArticleSchema);
    }

    add(article) {
        var a = new articleModel(article);
        return new Promise((resolve, reject) => {
            a.save(err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    find(): Promise<Article[]> {
        return new Promise((resolve, reject) => {
            this.articleModel.find((err, articles) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(articles);
                }
            });
        });
    }

    update(id, article): Promise<any> {
        return new Promise((resolve, reject) => {
            this.articleModel.update({ '_id': id }, { $set: { title: article.title, content: article.content } }, err => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                }
            });
        });
    }

    findById(id: string): Promise<Article> {
        return new Promise((resolve, reject) => {
            this.articleModel.findById(id, (err, a) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(a);
                }
            })
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            articleModel.findByIdAndRemove(id, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

export let articleDAO = new ArticleDAO();