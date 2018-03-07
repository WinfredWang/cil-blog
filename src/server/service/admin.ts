import { Path, GET, QueryParam, FormParam, Request, Response, PathParam, POST, DELETE } from "express-decorator";
import { Authentication } from "./authentication";
import { userDAO } from "../model/user";
import * as session from "express-session";
import * as crypto from "crypto";

function hashPwd2(pwd) {
    return hashPwd(hashPwd(pwd));
}

function hashPwd(pwd) {
    let md5 = crypto.createHash('md5');
    let content = pwd + "47823402hjkdf@@)_$$$"
    md5.update(content);

    return md5.digest('hex');
}

@Path("/route/admin")
export class AdminService {
    @POST("/login")
    login( @FormParam("user") user, @Response res, @Request req) {
        return userDAO.queryByName(user.name).then(users => {
            let status = 1;
            if (users.length == 1) {
                let userFromdb = users[0];
                if (userFromdb['password'] == hashPwd2(user.password)) {
                    Authentication.login(user.name, req, res);
                    status = 0;
                }
            }
            return Promise.resolve({ status: status });
        }).catch(err => {
            return Promise.resolve({ status: 1 });
        });
    }

    @POST("/validate")
    validate( @Response res, @Request req) {
        if (Authentication.isValidateUser(req, res)) {
            return { status: 0 };
        } else {
            return { status: 1 };
        }
    }
}