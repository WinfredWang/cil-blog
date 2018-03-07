import { mongoose } from './config';
import { User } from './model';

var UserSchema = new mongoose.Schema({
    name: String,
    password: String,
});

class UserDAO {
    private userModel;

    constructor() {
        this.userModel = mongoose.model('User', UserSchema);
    }

    queryByName(name: string): Promise<User[]> {
        return new Promise((resolve, reject) => {
            this.userModel.find({ name: name }, function (err, user) {
                if (err) {
                    reject(err)
                } else {
                    resolve(user);
                }
            })
        });
    }
}

export let userDAO = new UserDAO();
