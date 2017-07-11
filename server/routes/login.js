const crypto = require('crypto');

const TOKEN = "c-token"
function encodeToken(str, time) {
    let md5 = crypto.createHash('md5');
    let content = str + time;
    md5.update(content);

    return md5.digest('hex');
}


module.exports = {
    validateUser: function (req, res) {
        let token = req.cookies[TOKEN];
        if (token && req.session.data && (token == req.session.data.token)) {
            req.session.data.time = new Date().getTime();
            return true;
        }

        return false;
    },
    login: function (email, req, res) {
        let time = new Date().getTime();
        let token = encodeToken(email, time);
        res.clearCookie(TOKEN);  
        res.cookie(TOKEN, token, { maxAge: 1000 * 60 * 60, httpOnly: true});

        req.session.data = {
            token: token,
            time: time
        };
    }
};