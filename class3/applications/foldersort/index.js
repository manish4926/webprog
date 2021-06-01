const fs = require("fs");

let extensionMapping = require("./utils.js");

let finalFolderPath = "./downloads";

let allFiles = fs.readdirSync(finalFolderPath);

let folderToBeCreated;

//console.log(allFiles);

for(let i = 0; i < allFiles.length; i++) {
    //console.log(allFiles[i]);
    sortFiles(allFiles[i]);
}

function sortFiles(filename) {
    let extension = getExtension(filename);

    let isFolder = checkExtensionFolder(extension);

    if(!isFolder) {
        createExtensionFolder(extension);
    }
    moveFile(filename, extension)
}

function  getExtension(filename) {
    let ext = filename.split(".");
    return ext[1];
}

function checkExtensionFolder(extension) {
    let extensionFolderName;
    for(let key in extensionMapping) {
        let extensions = extensionMapping[key];
        if(extensions.includes(extension)) {
            extensionFolderName = key;
            break;
        }
    }
    let folderToBeChecked = finalFolderPath + "/" + extensionFolderName;
    folderToBeCreated = extensionFolderName;
    return fs.existsSync(folderToBeChecked);
}

function createExtensionFolder(extension) {
    //console.log(extension + " folder need to be created");
    //console.log(folderToBeCreated);
    fs.mkdirSync(finalFolderPath + "/" + folderToBeCreated)
}

function moveFile(filename, extension) {
    let sourceFile = finalFolderPath + "/" + filename;
    let destinationFile = finalFolderPath + "/" + folderToBeCreated + "/" + filename;
    fs.copyFileSync(sourceFile, destinationFile);
    fs.unlinkSync(sourceFile);
}