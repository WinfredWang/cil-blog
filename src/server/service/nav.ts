import { Path, GET, QueryParam, Request, Response } from "express-decorator";
import * as userValidator from "./login";

@Path('/nav')
export class NavService {
    @GET('/url')
    getUrls( @QueryParam('u') user, @Request req, @Response res) {
        if (user == 'admin' && userValidator.validateUser(req, res)) {
            return [{ name: '首页', url: 'manage' }, { name: '写博客', url: 'post' }];
        } else {
            return [{ name: '首页', url: 'article' }, { name: '关于', url: 'about' }];
        }
    }
}