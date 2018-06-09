import { mongoose } from './config';

export interface ITag {
    name: string;
}

var tagSchema = new mongoose.Schema({
    name: { type: String, unique: true }
});

class TagDAO {
    private tagModel;

    constructor() {
        this.tagModel = mongoose.model('Tag', tagSchema);
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.tagModel.find((err, tags) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(tags);
                }
            });
        });
    }

    add(tag: ITag) {
        var a = new this.tagModel(tag);
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

    delete(name: string) {
        return new Promise((resolve, reject) => {
            this.tagModel.findOneAndDelete({ name: name }, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

export let tagDAO = new TagDAO();