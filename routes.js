module.exports = function(app){
    // Require controller modules.
    let baseController = require('./controllers/BaseController');

    app.get("/modules", baseController.modules)
    app.get("/getModule/:moduleName", baseController.getModule)

    /* Add other logics here for the main server */
}