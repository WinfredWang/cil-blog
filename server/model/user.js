var mongo = require('./config').mongo;

var UserSchema = mongo.Schema({
    name: String,
    pwd: String
})
var userModel = mongo.model('User',UserSchema)

var UserDao = {
    add:function(user, callback) {
        var u = new userModel(user);
        u.save(callback);
    },
    del: function(user, callback) {
        userModel.remove(user, callback);
    },
    find:function(id, callback) {
        if (id) {
            userModel.find({'_id':id}, callback)
        } else {
            userModel.find(callback);
        }
        
    },
    update: function(id, user, callback) {
        userModel.update({'_id':user.id}, { $set: user}, callback);
    }
}; 


exports.UserDao = UserDao;
