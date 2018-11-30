const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const apiDir = path.join(__dirname, '../api');
const middleware = require('./middleware');

class routes {
    constructor(routes, controllers) {
        this.routes = routes;
        this.controllers = {controllers: controllers};
    }

    declare() {
        this.routes
            .forEach(route =>
                router[(route.method).toLowerCase()](
                    route.path,
                    this.handlers.apply(this, route.handlers)
                )
            );

        return router;
    }
    
    handlers(){
        let handlers = [];

        for ( let i=0; i<arguments.length; i++) {
            handlers.push(arguments[i].split('.').reduce((o,i)=>o[i], this.controllers));
        }

        return handlers;
    }   
}

module.exports = {
    load: (app, config) => {
        fs.readdirSync(apiDir)
            .filter(itm => fs.lstatSync(path.join(apiDir, itm)).isDirectory())
            .forEach(api => {
                let controllers = Object.assign(require(path.join(apiDir, api, 'controllers')), middleware);
                let routesConfig = require(path.join(apiDir, api, 'routes.json'));
                app.use(`${config.apiUrlBasePath}/`, new routes(routesConfig, controllers).declare());
            });
    }
}