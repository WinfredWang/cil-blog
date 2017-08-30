import { ArticleDao } from '../model/article';
import { Path, Get } from '../decorator';


@Path('/article')
export class base {
    @Get('/')
    articles(id: string) { }
}

export class xx extends base {
    articles(id: string) {
        super.articles(id);
        return new Promise(function (resolve, reject) {
            ArticleDao.find(id, function (err, article) {
                resolve(article);
                if (err) {
                    reject(err)
                }
            });
        });
    }
}