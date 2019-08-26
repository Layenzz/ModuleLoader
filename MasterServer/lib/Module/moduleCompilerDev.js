#!/usr/bin/env node

let file_system = require('fs');
let path = require('path');
let archiver = require('archiver');
let JavaScriptObfuscator = require('javascript-obfuscator');
let ncp = require('ncp').ncp;

let db = require('./DbConnector');

const [,, ...args] = process.argv;

if(args == [])
    return;

let modules = args[0];

let devPath = process.cwd() + "/src/Modules/dev/" + modules;
let json = require(devPath + "/configs/config.json");

db.query("SELECT * FROM modules WHERE nameModule = '"+ modules +"';").then((rows) => {

    let version = rows[0].devVersion;
    version = version.split('.');
    version[version.length - 1] = parseInt(version[version.length - 1]) + 1
    let newVersion = version.join('.');

    console.log(newVersion);

    db.query("UPDATE modules SET devVersion = '" + newVersion + "' WHERE nameModule = '"+ modules +"';")

    file_system.writeFileSync(devPath + "/configs/config.json", JSON.stringify(json,null,'\t'));

    let releasePath = process.cwd() + "/src/Modules/release/";
    let zipPath = process.cwd() + "/src/Release/";

    copyFolderRecursiveSync(devPath, releasePath);

    releasePath = releasePath + "/" + modules;

    let jsonFile = require(releasePath+'/configs/config.json')
    jsonFile.module.version = newVersion;
    file_system.writeFileSync(releasePath + "/configs/config.json", JSON.stringify(jsonFile,null,'\t'));

    filewalker(releasePath, function(err, data){
        if(err){
            throw err;
        }

        // ["c://some-existent-path/file.txt","c:/some-existent-path/subfolder"]
        let scripts = [];

        data.forEach(function(element){
            if(element.includes(".js") && !element.includes(".json")){
                scripts.push(element);
            }
        })

        scripts.forEach(function(element){
            file_system.readFile(element, "UTF-8", function(err, data) {
                if (err) {
                    throw err;
                }

                // Obfuscate content of the JS file
                let obfuscationResult = JavaScriptObfuscator.obfuscate(data);

                // Write the obfuscated code into a new file
                file_system.writeFile(element, obfuscationResult.getObfuscatedCode() , function(err) {
                    if(err) {
                        return console.log(err);
                    }
                });
            });
        });

        zipDirectory(releasePath, zipPath + modules + "-dev.zip").then(() => {
            console.log("Compréssion du module "+ modules +" effectuée");
            return;
        }).catch(() => {
            console.log("Compréssion du module "+ modules +" abandonnée");
        });
    });
}).catch(() => {

})



function zipDirectory(source, out) {
    const archive = archiver('zip', { zlib: { level: 9 }});
    const stream = file_system.createWriteStream(out);

    return new Promise((resolve, reject) => {
        archive
            .directory(source, false)
            .on('error', err => reject(err))
            .pipe(stream)
        ;

        stream.on('close', () => resolve());
        archive.finalize();
    });
}

function filewalker(dir, done) {
    let results = [];

    file_system.readdir(dir, function(err, list) {
        if (err) return done(err);

        let pending = list.length;

        if (!pending) return done(null, results);

        list.forEach(function(file){
            file = path.resolve(dir, file);

            file_system.stat(file, function(err, stat){
                // If directory, execute a recursive call
                if (stat && stat.isDirectory()) {
                    // Add directory to array [comment if you need to remove the directories from the array]
                    results.push(file);

                    filewalker(file, function(err, res){
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);

                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

function copyFileSync( source, target ) {

    let targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( file_system.existsSync( target ) ) {
        if ( file_system.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    file_system.writeFileSync(targetFile, file_system.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
    let files = [];

    //check if folder needs to be created or integrated
    let targetFolder = path.join( target, path.basename( source ) );
    if ( !file_system.existsSync( targetFolder ) ) {
        file_system.mkdirSync( targetFolder );
    }

    //copy
    if ( file_system.lstatSync( source ).isDirectory() ) {
        files = file_system.readdirSync( source );
        files.forEach( function ( file ) {
            let curSource = path.join( source, file );
            if ( file_system.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}
