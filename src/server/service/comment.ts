import { Path, GET, QueryParam, FormParam, Request, Response, PathParam, POST, DELETE, PUT } from "express-decorator";
import { commentDAO } from '../model/comment';
import { ResponseBody, ResCode, Comment } from './types';

@Path("/route")
export class CommentService {
    @GET('/article/:id/comments')
    getAll() {
        return commentDAO.find();
    }

    @POST("/comment")
    add(@FormParam('comment') comment: Comment) {
        if (!comment.nickName) {
            return Promise.resolve(new ResponseBody(ResCode.Error, "Please input nickname."));
        }
        if (comment.nickName.length < 3 || comment.nickName.length > 20) {
            return Promise.resolve(new ResponseBody(ResCode.Error, "Please nickname length must be between 3 and 20."));
        }
        if (!comment.email) {
            return Promise.resolve(new ResponseBody(ResCode.Error, "Please input emial."));
        }
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(comment.email)) {
            return Promise.resolve(new ResponseBody(ResCode.Error, "The email format is not right."));
        }
        if (comment.email.length < 3 || comment.email.length > 20) {
            return Promise.resolve(new ResponseBody(ResCode.Error, "Please email length must be between 3 and 20."));
        }
        if (!comment.content) {
            return Promise.resolve(new ResponseBody(ResCode.Error, "The comment cannot be empty."));
        }
        if (comment.content.length < 3 && comment.content.length > 200) {
            return Promise.resolve(new ResponseBody(ResCode.Error, "Please email length must be between 3 and 200."));
        }

        if (!comment.articleId) {
            return Promise.resolve(new ResponseBody(ResCode.Error, "The articeId cannot be empty."));
        }

        comment.postTime = new Date().getTime();
        return commentDAO.add(comment).then(data => {
            if (data) {
                return Promise.resolve(new ResponseBody(ResCode.Success))
            } else {
                return Promise.resolve(new ResponseBody(ResCode.Error, "Failed to comment, please retry later."));
            }
        });
    }


    @DELETE('/comment/:id')
    delete(@PathParam("id") id) {
        return commentDAO.delete(id).then(data => {
            if (data) {
                return Promise.resolve({ 'msg': 'failure' })
            } else {
                return Promise.resolve({ 'msg': 'success' });
            }
        });
    }
}