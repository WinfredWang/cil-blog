import * as crypto from "crypto";
import AuthConfig from "../config/auth";

const TOKEN = "c-token"
function encodeToken(str: string, time: any) {
    let md5 = crypto.createHash('md5');
    let content = str + time;
    md5.update(content);

    return md5.digest('hex');
}

export var Authentication = {
    isValidateUser: function (req: any, res: any) {
        let token = req.cookies[TOKEN];
        if (token && req.session.data && (token == req.session.data.token)) {
            req.session.data.time = new Date().getTime();
            return true;
        }

        return false;
    },
    login: function (email: string, req: any, res: any) {
        let time = new Date().getTime();
        let token = encodeToken(email, time);
        res.clearCookie(TOKEN);
        res.cookie(TOKEN, token, { maxAge: 1000 * 60 * 60, httpOnly: true });

        req.session.data = {
            token: token,
            time: time
        };
    }
}

export function AuthMiddleware(req, res, next) {
    if (Authentication.isValidateUser(req, res)) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}
