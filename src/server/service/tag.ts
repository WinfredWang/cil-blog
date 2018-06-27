import { Path, GET, QueryParam, FormParam, Request, Response, PathParam, POST, DELETE, PUT } from "express-decorator";
import { tagDAO, ITag } from '../model/tag';
import { ResponseBody, ResCode, Comment } from '../types';
import { AuthMiddleware } from './authentication';
import { TagCache } from './redis';

@Path("/route")
export class TagService {

    @GET('/tags')
    getAll() {
        return TagCache.getTags().then(data => {
            return data;
        }).catch(() => {
            return tagDAO.getAll().then(data => {
                TagCache.setTags(data);
                return data;
            });
        })
    }

    @POST("/tag", [AuthMiddleware])
    add(@FormParam('tag') tag: ITag) {
        if (!tag.name) {
            return Promise.resolve(new ResponseBody(ResCode.Error, "Please input tag name."));
        }
        if (tag.name.length < 2 || tag.name.length > 50) {
            return Promise.resolve(new ResponseBody(ResCode.Error, "Please tag name length must be between 3 and 20."));
        }

        return tagDAO.add(tag).then(data => {
            if (data) {
                return Promise.resolve(new ResponseBody(ResCode.Success))
            } else {
                return Promise.resolve(new ResponseBody(ResCode.Error, "Failed to add tag, please retry later."));
            }
        });
    }

    @DELETE('/tag/:name', [AuthMiddleware])
    delete(@PathParam("name") name) {
        return tagDAO.delete(name).then(data => {
            if (data) {
                return Promise.resolve(new ResponseBody(ResCode.Error, "Failed to delete comment."))
            } else {
                return Promise.resolve(new ResponseBody(ResCode.Success));
            }
        });
    }
}