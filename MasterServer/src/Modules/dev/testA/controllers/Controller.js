const fs = require('fs');

class Controller{
    constructor(manager){
        this.appManager =  manager;
        this.modelManager = manager.getManager("modelManager");
    }

    index(req, res, manager){
        this.appManager = manager;
        this.modelManager = manager.getManager("modelManager");

        res.status(200).send(global.sendResponse({
            success: "1"
        }))
    }
}

module.exports = Controller;