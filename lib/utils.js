const qs = require('mongo-querystring');

module.exports = {
    parseQuery: async (querystring) => {
        const select = {};
        const cursor = {};
        
        if ( querystring.hasOwnProperty('fields') ) {
            let fieldValue = 1;
    
            if( querystring.fields.startsWith('-') ) {
                fieldValue = 0;
                querystring.fields = querystring.fields.substr(1);
            }
    
            querystring.fields
                .split(',')
                .forEach(field => {
                    select[field] = fieldValue;
                });
    
            delete querystring.fields;
        }
    
        if ( querystring.hasOwnProperty('limit') || querystring.hasOwnProperty('skip') ) {
            cursor.limit = parseInt(querystring.limit);
            cursor.skip = parseInt(querystring.skip) || 0;
    
            delete querystring.limit;
            delete querystring.skip;
        }
    
        if ( querystring.hasOwnProperty('sort') ) {
            let sort = {};
            querystring.sort
                .split(',')
                .forEach(field => {
                    if( field.startsWith('-') ) {
                        sort[field.substr(1)] = -1;
                    } else {
                        sort[field] = 1;
                    }
                });
    
            cursor.sort = sort;
            delete querystring.sort;
        }
    
        return {
            filters: new qs().parse(querystring),
            select: select,
            cursor: cursor
        };
    }
}