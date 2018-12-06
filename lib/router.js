const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const apiDir = path.join(__dirname, '../api');
const utils = require('./utils');
const middleware = require(`${apiDir}/middleware`);

class routes {
    constructor(routes, controllers) {
        this.routes = routes;
        this.controllers = {
            controllers: controllers,
            middleware: middleware,
            utils: utils
        };
    }

    get() {
        this.adjustHandlers();
        this.routes
            .forEach(route => {
                router[(route.method).toLowerCase()](
                    route.path,
                    this.handlers.apply(this, route.handlers)
                );
            });
        return router;
    }

    adjustHandlers() {
        return this.routes
                .map( route => {
                    if ( route.hasOwnProperty('roles') && route.roles )
                        route.handlers.splice(0, 0, 'utils.isAuthenticated');

                    route.handlers.push('utils.responseObject');
                });
    }
    
    handlers(){
        let handlers = [];

        for ( let i=0; i<arguments.length; i++) {
            handlers.push(
                arguments[i]
                    .split('.')
                    .reduce((o,i)=>o[i], this.controllers)
            );
        }

        return handlers;
    }   
}

module.exports = {
    load: (app) => {
        let combinedRoutes = [];
        fs.readdirSync(apiDir)
            .filter(itm => fs.lstatSync(path.join(apiDir, itm)).isDirectory())
            .forEach(api => {
                let controllers = require(path.join(apiDir, api, 'controllers'));
                let routesConfig = require(path.join(apiDir, api, 'routes.json'));
                let moduleRoutes = new routes(routesConfig, controllers).get();

                combinedRoutes = combinedRoutes.concat(routesConfig);

                app.use(`${app.get('config').urlBasePath}/`, moduleRoutes);
            });
        
        app.set('routes', combinedRoutes);
    }
}