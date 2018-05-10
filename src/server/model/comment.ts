import { mongoose } from './config';
import { Article } from './model';

var Commentschema = new mongoose.Schema({
    email: String,
    nickName: String,
    articleIdnp: String,
    commentId: String,
    content: String,
    time: String
});

class CommentDAO {
    private commentModel;
    constructor() {
        this.commentModel = mongoose.model('Comment', Commentschema);
    }

    add(comment) {
        var a = new this.commentModel(comment);
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
            this.commentModel.find((err, articles) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(articles);
                }
            });
        });
    }

    findById(id: string): Promise<Article> {
        return new Promise((resolve, reject) => {
            this.commentModel.findById(id, (err, a) => {
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
            this.commentModel.findByIdAndRemove(id, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

export let commentDAO = new CommentDAO();


 