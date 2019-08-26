global.config = require("./config/config.json") ;

global.DEBUG = config.debug || false;
global.PORT = config.serverPort || 6000;
global.DATABASE = config.database || {
    "host": "localhost",
    "database": "moduleLoader",
    "username": "admin",
    "password": ""
};

global.sendResponse = function(data, statut = 1){
    return {
        response: data,
        responseStatut: statut,
    }
}

global.db = require('./database');

global.addslashes = function(txt) {
    return txt.replace(/\\/g, '\\\\').
    replace(/\u0008/g, '\\b').
    replace(/\t/g, '\\t').
    replace(/\n/g, '\\n').
    replace(/\f/g, '\\f').
    replace(/\r/g, '\\r').
    replace(/'/g, '\\\'').
    replace(/"/g, '\\"');
}

global.getResult = async function(query) {
    try {
        var result = await db.query(query)

        return result;
    } catch(err) {
        throw new Error(err)
    }
}

global.log = function(req, msg){
    
}

global.debug = function(title, msg){
    if(DEBUG)
        console.log("[DEBUG:"+title+"] " + msg);
}