import { Path, GET, QueryParam, Request, Response } from "express-decorator";
import * as userValidator from "./login";

@Path('/nav')
export class NavService {
    @GET('/url')
    getUrls( @QueryParam('u') user, @Request req, @Response res) {
        if (user == 'admin' && userValidator.validateUser(req, res)) {
            return [ { name: '写博客', url: 'post' }, { name: '首页', url: 'manage' }];
        } else {
            return [ { name: '关于', url: 'about' }, { name: '首页', url: 'article' }];
        }
    }
}