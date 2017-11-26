import { Path, GET, QueryParam, FormParam, Request, Response, PathParam, POST, DELETE } from "express-decorator";
import { ArticleDao } from '../model/article';

@Path("/article")
export class ArticleService {
    @GET('/')
    getAll() {
        return new Promise(function (resolve, reject) {
            ArticleDao.find(null, function (err, articles) {
                if (err) {
                    reject(err)
                } else {
                    resolve(articles);
                }
            });
        });
    }

    @GET("/:id")
    getById( @PathParam("id") id: string) {
        return new Promise((resolve, reject) => {
            ArticleDao.find(id, function (err, article) {
                if (err) {
                    reject(err);
                } else {
                    resolve(article);
                }
            });
        })
    }

    @POST("/save")
    save( @FormParam('article') article) {
        return new Promise((resolve, reject) => {
            ArticleDao.addOrUpdate(article, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ 'msg': 'sucesss' });
                }
            });
        });
    }

    @DELETE('/:id')
    delete( @PathParam("id") id) {
        return new Promise((resolve, reject) => {
            ArticleDao.remove(id, (err) => {
                if (err) {
                    reject({ 'msg': 'failed' });
                } else {
                    resolve({ 'msg': 'sucesss' });
                }
            });
        });
    }
}