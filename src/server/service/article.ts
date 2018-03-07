import { Path, GET, QueryParam, FormParam, Request, Response, PathParam, POST, DELETE, PUT } from "express-decorator";
import { articleDAO } from '../model/article';

@Path("/route")
export class ArticleService {
    @GET('/articles')
    getAll() {
        return articleDAO.find();
    }

    @GET("/article/:id")
    getById( @PathParam("id") id: string) {
        return articleDAO.findById(id);
    }

    @PUT("/article")
    update( @FormParam('article') article) {
        let now = new Date();
        article.postDate = now;
        article.lastModifyDate = now;
        article.readTime = 0;
        article.status = 0;

        return articleDAO.update(article._id, article).then(() => {
            return Promise.resolve({ 'msg': 'success' });
        }).catch(err => {
            return Promise.resolve({ 'msg': 'failure' })
        });
    }

    @POST("/article")
    add( @FormParam('article') article) {
        return articleDAO.add(article).then(data => {
            if (data) {
                return Promise.resolve({ 'msg': 'failure' })
            } else {
                return Promise.resolve({ 'msg': 'success' });
            }

        });
    }

    @PUT("/article/:id/readtime")
    updateReadTime( @PathParam('id') id, @FormParam('article') article) {

        return '';
    }

    @DELETE('/article/:id')
    delete( @PathParam("id") id) {
        return articleDAO.delete(id).then(data => {
            if (data) {
                return Promise.resolve({ 'msg': 'failure' })
            } else {
                return Promise.resolve({ 'msg': 'success' });
            }

        });
    }
}