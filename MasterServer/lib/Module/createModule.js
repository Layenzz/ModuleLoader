#!/usr/bin/env node

let file_system = require('fs');
let path = require('path');
let archiver = require('archiver');
let JavaScriptObfuscator = require('javascript-obfuscator');
let ncp = require('ncp').ncp;

const [,, ...args] = process.argv;

if(args == [])
    return;

let modules = args[0];

let devPath = process.cwd() + "\\src\\Modules\\release\\example";
let releasePath = process.cwd() + "\\src\\Modules\\dev\\";

copyFolderRecursiveSync(devPath, releasePath);

file_system.renameSync(releasePath + "\\example", releasePath + "\\" + modules)


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