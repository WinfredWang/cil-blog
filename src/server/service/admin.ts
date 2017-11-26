import { Path, GET, QueryParam, FormParam, Request, Response, PathParam, POST, DELETE } from "express-decorator";
import * as userValidator from "./login";
import * as session from "express-session";
import { PassThrough } from "stream";
import { request } from "http";


@Path("/admin")
export class AdminService {
    @POST("/login")
    login( @FormParam("user") user, @Response res, @Request req) {
        if (user.email == "wang") {
            userValidator.login(user.email, req, res);
            return { status: 0 };
        } else {
            return { status: 1 };
        }
    }

    @POST("/validate")
    validate( @Response res, @Request req) {
        if (userValidator.validateUser(req, res)) {
            return { status: 0 };
        } else {
            return { status: 1 };
        }
    }
}