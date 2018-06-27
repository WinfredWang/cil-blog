import { mongoose } from './config';
import { Article } from './model';
import { IPageQuery } from '../types';

export const ArticleStatus = {
    Post: 1,
    Draft: 0
}

const LIMIT = 10;

var Commentschema = new mongoose.Schema({
    email: String,
    nickName: String,
    content: String,
    time: String
});

var ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    status: Number,
    readTime: Number,
    postTime: Number,
    lastModifyTime: Number,
    comments: [Commentschema],
    tags: [String]
});

class ArticleDAO {
    private articleModel;
    constructor() {
        this.articleModel = mongoose.model('Article', ArticleSchema);
    }

    add(article) {
        var a = new this.articleModel(article);
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

    count(condition) {
        return new Promise((resolve, reject) => {
            this.articleModel.find(condition).count((err, count) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(count);
                }
            });
        });
    }

    find(status?: number, pageQuery?: IPageQuery): Promise<IPageQuery> {
        !pageQuery && (pageQuery = {});
        !pageQuery.index && (pageQuery.index = 1);

        let condition: any = {};
        status !== undefined && (condition.status = status);
        pageQuery.tag && (condition.tags = pageQuery.tag);

        let countPromise = this.count(condition);
        let articlePromise = new Promise((resolve, reject) => {
            let query = this.articleModel.find(condition);
            query.sort({ postTime: -1 });
            if (pageQuery.limit) {
                pageQuery.index && query.skip((pageQuery.index - 1) * pageQuery.limit);
                query.limit(pageQuery.limit);
            }

            query.exec((err, articles) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(articles);
                }
            });
        });

        return Promise.all([countPromise, articlePromise]).then(data => {
            pageQuery.count = <number>data[0];
            pageQuery.value = <any[]>data[1];

            return Promise.resolve(pageQuery);
        })
    }

    update(id, article): Promise<any> {
        return new Promise((resolve, reject) => {
            this.articleModel.update({ '_id': id }, { $set: article }, err => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                }
            });
        });
    }

    addComment(articleId, comment) {
        return new Promise((resolve, reject) => {
            this.articleModel.update({ '_id': articleId }, { $push: { comments: comment } }, err => {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                }
            });
        });
    }

    findComments(articleId) {
        return new Promise((resolve, reject) => {
            this.articleModel.findById(articleId, (err, a) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(a.comments)
                }
            })
        });
    }

    findById(id: string): Promise<Article> {
        return new Promise((resolve, reject) => {
            this.articleModel.findById(id, (err, a) => {
                if (err) {
                    reject(err);
                } else {
                    delete a.comments;
                    resolve(a);
                }
            })
        });
    }
}

export let articleDAO = new ArticleDAO();