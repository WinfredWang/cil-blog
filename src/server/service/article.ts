import { Path, GET, QueryParam, FormParam, Request, Response, PathParam, POST, DELETE, PUT } from "express-decorator";
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

    @POST("/")
    save( @FormParam('article') article) {

        let now = new Date();
        article.postDate = now;
        article.lastModifyDate = now;
        article.readTime = 0;
        article.status = 0;

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

    @PUT("/")
    update( @FormParam('article') article) {
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

    @PUT("/:id/readtime")
    updateReadTime( @PathParam('id') id, @FormParam('article') article) {
        ArticleDao.find(id, function (err, article) {
            if (!err) {
                article.readTime++;
                ArticleDao.addOrUpdate(article, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });

        return '';
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