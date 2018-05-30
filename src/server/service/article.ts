import { Path, GET, QueryParam, FormParam, Request, Response, PathParam, POST, DELETE, PUT } from "express-decorator";
import { articleDAO, ArticleStatus } from '../model/article';
import { Article } from './types';
import { ResponseBody, ResCode } from './types';
import { AuthMiddleware } from './authentication';

@Path("/route")
export class ArticleService {
    @GET('/articles')
    getPostArtice(@QueryParam('index') index: number) {
        return articleDAO.find(ArticleStatus.Post );
    }

    @GET('/articles/all')
    getAllArtice() {
        return articleDAO.find();
    }

    @GET("/article/:id")
    getById(@PathParam("id") id: string) {
        return articleDAO.findById(id);
    }

    @PUT("/article", [AuthMiddleware])
    update(@FormParam('article') article: Article) {
        return articleDAO.findById(article._id).then(() => {
            let now = new Date().getTime();
            return this.updateArticle(article._id, {
                content: article.content,
                lastModifyTime: now,
                status: article.status,
                title: article.title
            });
        });
    }

    @POST("/article", [AuthMiddleware])
    add(@FormParam('article') article: Article) {
        let curTime = new Date().getTime();
        article.postTime = curTime;
        article.lastModifyTime = curTime;
        article.readTime = 0;
        !article.status && (article.status = 0);
        return articleDAO.add(article).then(data => {
            if (data) {
                return Promise.resolve(new ResponseBody(ResCode.Error))
            } else {
                return Promise.resolve(new ResponseBody(ResCode.Success))
            }
        });
    }

    @PUT("/article/:id/readtime")
    updateReadTime(@PathParam('id') id) {
        return articleDAO.findById(id).then((article: Article) => {
            !article.readTime && (article.readTime = 0);
            let time = article.readTime;
            return this.updateArticle(id, { readtime: ++time });
        });
    }

    @POST('/article/:id/post', [AuthMiddleware])
    post(@PathParam("id") id) {
        return articleDAO.findById(id).then(() => {
            return this.updateArticle(id, { status: ArticleStatus.Post })
        }).catch(() => {
            return Promise.resolve(new ResponseBody(ResCode.Error))
        });
    }

    @POST('/article/:id/draft', [AuthMiddleware])
    draft(@PathParam("id") id) {
        return articleDAO.findById(id).then(() => {
            return this.updateArticle(id, { status: ArticleStatus.Draft })
        }).catch(() => {
            return Promise.resolve(new ResponseBody(ResCode.Error))
        });
    }

    private updateArticle(id: string, article) {
        return articleDAO.update(id, article).then(res => {
            if (!res) {
                return Promise.resolve(new ResponseBody(ResCode.Success))
            }
            return Promise.resolve(new ResponseBody(ResCode.Error))
        })
    }
}