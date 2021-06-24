const fs = require("fs");

async function waitAndClick(selector, tab) {
    try {
        await tab.waitForSelector(selector, { visible: true });
        await tab.click(selector);    
    } catch (error) {
        throw new Error(error);
    }
    
}

function createFolder(pageUrl) {
    let slug = getSlug(pageUrl);
    let finalFolderPath = "./images";
    fs.mkdirSync(finalFolderPath + "/" + slug, {recursive: true}, err => {});
    fs.mkdirSync(finalFolderPath + "/" + slug+"/cropped", {recursive: true}, err => {});
    console.log(slug);
    return slug;
}

function getSlug(pageUrl) {
    try {
        pageUrl = pageUrl.split("/");
        let len = pageUrl.length;
        pageUrl = pageUrl[len-1];
        return pageUrl
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
        
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
   waitAndClick,
   createFolder
}