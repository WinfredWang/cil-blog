import * as express from "express";
import { Router } from "express";


function getMeta(target: Function) {
    let o = <any>target
    return o._meta_ || (o._meta_ = {})
}

export function Path(baseUrl: string) {
    return function (target: Function) {
        let meta = getMeta(target.prototype);
        meta.baseUrl = baseUrl;
    }
}

export function Get(url: string, params?: string[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let meta = getMeta(target);
        let routes = meta.routes || (meta.routes = {});

        routes[propertyKey] = {
            url: url,
            method: 'get',
            params: params
        }
    }
}

export function register(app, controllers: any[]) {

    controllers.forEach((c) => {

        let controller = new c();

        let router: Router = Router();

        let meta = getMeta(controller);
        let routes = meta.routes;
        let baseUrl: string = meta.baseUrl;

        for (const methodName in routes) {

            let method: string = routes[methodName].method;
            let fn: Function;

            fn = (req, res, next) => {
                let args = extractParameters(req, routes[methodName]['params']);

                let p = controller[methodName].apply(controller, args);
                p.then((value) => {
                    res.jsonp(value);
                });
            };

            let routeArgs = [
                routes[methodName].url, fn
            ];

            router[method].apply(router, routeArgs);
        }

        app.use(baseUrl, router);

        return app;
    })

}

function extractParameters(req, params) {
    let args = [];
    if (!params) {
        return;
    }
    for (let item of params) {
        args.push(req.params[item])
    }

    return args;
}
