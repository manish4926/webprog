const sharp  = require('sharp');
const PDFDocument = require('pdfkit');
const fs = require('fs');;
const puppeteer = require('puppeteer');
const {waitAndClick, createFolder} = require('./utils.js');
let tab;
let imageFolder;

let folderToBeCreated;

(async function() {
    let browser = await puppeteer.launch( { 
    headless: false,
    defaultViewport: null,
        args: ["--start-maximized"],
        executablePath: 'C://Program Files (x86)//Google//Chrome//Application//chrome.exe' });
    
    let pages = await browser.pages();
    tab = pages[0];
    let pageUrl = "https://www.scribd.com/read/163573391/The-22-Immutable-Laws-of-Marketing-Exposed-and-Explained-by-the-World-s-Two#";
    let slug = createFolder(pageUrl);
    let finalFolderPath = "./images";
    imageFolder = finalFolderPath + "/" + slug;
    //Folder Created

    await tab.goto(pageUrl);
    await waitAndClick('.toggle_fullscreen',tab);
    await tab.waitForSelector(".reader_column.left_column" , {visible:true});

    for (let i = 1; i < 17; i++) {
        let imagePath = imageFolder+'/'+i+'.png';
        await tab.waitForTimeout(3000);
        await tab.screenshot({path: imagePath});    
        await tab.waitForTimeout(3000);
        await waitAndClick('.page_arrow_link.right_arrow', tab);
        await cropImage(i+'.png');
        console.log("Image "+i+" Created");
    }
    
    console.log("Image Created");

    await createPDF(slug);

    await fs.rmdirSync(finalFolderPath, { recursive: true });
})();

async function createPDF(slug) {
    doc = new PDFDocument(
        {
            layout : 'landscape'
        }
    );
    doc.pipe(fs.createWriteStream(slug+'.pdf'));

    

    doc.image(imageFolder+'/cropped/1.png', {
        fit: [700, 590],
        align: 'center',
        valign: 'center',
    });

    for (let index = 2; index < 16; index++) {
        doc.addPage()
        .image(imageFolder+'/cropped/'+index+'.png', {
            fit: [700, 590],
            align: 'center',
            valign: 'center',
        });
    }

    
    doc.end();
    //console.log(slug);
}
async function cropImage(imageName) {
    let originalImage = imageFolder+'/'+imageName;
    let outputImage = imageFolder+'/cropped/'+imageName;
    await sharp(originalImage).extract({ width: 1170, height: 490, left: 100, top: 60 }).toFile(outputImage)
}

