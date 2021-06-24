const html_to_pdf = require('html-pdf-node');
const sharp  = require('sharp');
const PDFDocument = require('pdfkit');
const fs = require('fs');
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

    //Folder Created

    await tab.goto(pageUrl);
    await waitAndClick('.toggle_fullscreen',tab);
    await tab.waitForSelector(".reader_column.left_column" , {visible:true});

    await generateDOMToPdf(slug);
    await imageToPDF(slug);
    
    console.log("PDF Created");
    
    
})();

async function imageToPDF(slug) {
    let finalFolderPath = "./images";
    imageFolder = finalFolderPath + "/" + slug;

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
}

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



async function generateDOMToPdf(slug) {
    let exitCode = "";
    for (let i = 1; i < 17; i++) {

        await tab.waitForTimeout(3000);
        
        let leftContent = await tab.$eval('.reader_column.left_column', (element) => {
            return element.innerHTML
        });

        let rightContent = await tab.$eval('.reader_column.right_column', (element) => {
            return element.innerHTML
        });

        let completeCode = leftContent + rightContent;
        splitCode = completeCode.split('src="');
        splitCode.forEach(element => {
            element = element+"https://www.scribd.com/";
        });
        for(var k=0;k<splitCode.length;k++){
            if(k == splitCode.length - 1)  {
                continue;
            }
            splitCode[k]= splitCode[k]+'src="https://www.scribd.com';
        }
        finalCode = splitCode.join("");
        finalCode = replaceAll(finalCode, "position: absolute", "position: relative");
        exitCode = exitCode + finalCode;
        await tab.waitForTimeout(3000);
        await waitAndClick('.page_arrow_link.right_arrow', tab);
        await tab.waitForTimeout(3000);
        console.log("Code Page "+i+" Generated");

    }
    
    fs.writeFileSync("./"+slug+".html", exitCode);
    await convertDOMToPdf(finalCode,slug);
}


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

async function convertDOMToPdf(code,slug) {
    let options = { format: 'A4',path : './'+slug+'-dom.pdf' };
    let file = { content: code };
    await html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        console.log("PDF Buffer:-", pdfBuffer);
    });
}