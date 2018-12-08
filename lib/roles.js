const _ = require('lodash');

const roles = (() => {
    async function getMatchedRoute(req) {
        const matchers = { method: _.get(req,'method'), path: _.get(req,'route.path') };
        const matchedRoute = _.find(req.app.get('routes'), matchers);
        return matchedRoute;
    }
    
    async function hasRequireRole(req) {
        const definedRoles = await getMatchedRoute(req);
        const userRole = req.authenticatedUser.role;
    
        if ( userRole && definedRoles.hasOwnProperty('roles') )
            return definedRoles.roles.indexOf(userRole) > -1;
    
        return false;
    }
        
    return {
        checkAccess: async (req) => {
            return await hasRequireRole(req);
        }
    }
})();

module.exports = roles;