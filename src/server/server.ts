
import * as http from 'http';
import * as express from "express";
import * as path from "path";
import * as cluster from "cluster";
import * as session from "express-session";
import { RegisterService } from 'express-decorator'
import { ArticleService } from "./service/article";
import { AdminService } from "./service/admin";
import { NavService } from "./service/nav";

const numCPUs = require('os').cpus().length;

function initExpress(app) {
    app.use(express.static(path.join(__dirname, 'client')));

    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }))

    RegisterService(app, [NavService, ArticleService, AdminService]);

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
    let port = 3000;
    app.set('port', port);
    let server = http.createServer(app);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    function onError(error: any) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

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
    }

    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        console.log('Listening on ' + bind);
    }
}
// if (cluster.isMaster) {
//     console.log(`主进程 ${process.pid} 正在运行`);

//     // 衍生工作进程。
//     for (let i = 0; i < numCPUs; i++) {
//       cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//       console.log(`工作进程 ${worker.process.pid} 已退出`);
//     });
//   } else {
//     

//     console.log(`工作进程 ${process.pid} 已启动`);
//   }
let app = express();
initExpress(app);
createServer(app);

