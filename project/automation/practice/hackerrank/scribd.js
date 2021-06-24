const nodeHtmlToImage = require('node-html-to-image')
const puppeteer = require('puppeteer');
let tab;

(async function() {
    let browser = await puppeteer.launch( { 
    headless: false,
    defaultViewport: null,
        args: ["--start-maximized"],
        executablePath: 'C://Program Files (x86)//Google//Chrome//Application//chrome.exe' });
    
    let pages = await browser.pages();
    tab = pages[0];
    await tab.goto("https://www.scribd.com/read/163573391/The-22-Immutable-Laws-of-Marketing-Exposed-and-Explained-by-the-World-s-Two#");
    await waitAndClick('.toggle_fullscreen', { visible: true });
    await tab.waitForSelector(".reader_column.left_column" , {visible:true});
    
    let leftContent = await tab.$eval('.reader_column.left_column', (element) => {
        return element.innerHTML
    });

    let rightContent = await tab.$eval('.reader_column.right_column', (element) => {
        return element.innerHTML
    });

    let completeCode = leftContent + rightContent;
    await convertDOMToPdf(completeCode);
    console.log("Image Created");
})();

async function waitAndClick(selector) {
    try {
        await tab.waitForSelector(selector, { visible: true });
        await tab.click(selector);    
    } catch (error) {
        throw new Error(error);
    }
    
};

async function convertDOMToPdf(htmlCode) {
    try {
        await nodeHtmlToImage({
            output: './image.png',
            html: htmlCode
        })  
    } catch (error) {
        throw new Error(error);
    }
    
};
