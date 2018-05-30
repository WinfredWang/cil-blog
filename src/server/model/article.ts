import { mongoose } from './config';
import { Article } from './model';
import { resolve } from 'url';
import { IPageQuery } from './types';

export const ArticleStatus = {
    Post: 1,
    Draft: 0
}

var ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    status: Number,
    readTime: Number,
    postTime: Number,
    lastModifyTime: Number
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

    find(status?: number, pageQuery?: IPageQuery): Promise<Article[]> {
        return new Promise((resolve, reject) => {
            let query = this.articleModel.find(status === undefined ? {} : { status: status });
            query.sort({ postTime: -1 });
            if (pageQuery) {
                pageQuery.curIndex && query.skip((pageQuery.curIndex - 1) * pageQuery.limit);
                pageQuery.limit && query.limit(pageQuery.limit);
            }
            query.exec((err, articles) => {
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
            this.articleModel.update({ '_id': id }, { $set: article }, err => {
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
}

export let articleDAO = new ArticleDAO();