
import * as http from 'http';
import * as express from "express";
import * as path from "path";
import * as session from "express-session";
import * as history from 'connect-history-api-fallback';
import { RegisterService } from 'express-decorator'
import { ArticleService } from "./service/article";
import { CommentService } from "./service/comment";
import { TagService } from "./service/tag";
import { AdminService } from "./service/admin";

let port = 3000;

function initExpress(app) {
    app.use(history({
        rewrites: [
            { from: /\/admin\/login/, to: '/admin/login.html' },
            { from: /\/admin/, to: '/admin/index.html' }
        ]
    }));
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }))

    // app.use(Auth);
    RegisterService(app, [ArticleService, AdminService, CommentService, TagService]);

    app.use(express.static(path.join(__dirname, 'client')));


    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        next(err);
    });

    // error handler
    app.use(function (err: any, req: any, res: any, next: any) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}

function createServer(app) {

    app.set('port', port);
    let server = http.createServer(app);
    server.listen(port);

    server.on('error', function (error: any) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = 'Port ' + port;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    });

    server.on('listening', function () {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        console.log('Listening on ' + bind);
    });
}

let app = express();
initExpress(app);
createServer(app);

