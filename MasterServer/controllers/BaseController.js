const child_process = require('child_process');
var file_system = require('fs');

exports.index = function(req, res){
    res.status(200).send(global.sendResponse("API Works !"))
}

exports.modules = async function(req, res){
    let apiKey = global.addslashes(req.query.apiKey);

    try {
        rows = await db.query("SELECT * FROM application_modules LEFT JOIN modules  ON (application_modules.idModule=modules.id) WHERE apiKey = '"+ apiKey +"';")
    } catch(err) {
        throw new Error(err)
    }

    res.status(200).send(global.sendResponse({
        items: rows
    }))
    
}

exports.getModule = function(req, res){
    let moduleName = req.params.moduleName;

    let folderpath = process.cwd() + "\\src\\Release\\" + moduleName + ".zip";

    if (!file_system.existsSync(folderpath)) {
        res.status(404).send(global.sendResponse({
            items: []
        }, 0))
    }

    res.download(folderpath);
}

