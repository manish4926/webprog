const puppeteer = require('puppeteer');
const id = "pikikep510@geekale.com";
const pw = "123456789";
let tab;
let idx;
let solutionCode;


(async function() {
    let browser = await puppeteer.launch( { 
    headless: false,
    defaultViewport: null,
        args: ["--start-maximized"],
        executablePath: 'C://Program Files (x86)//Google//Chrome//Application//chrome.exe' });
    
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1",id);
    await tab.type("#input-2",pw);
    await tab.click(".auth-button");
        await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    // await tab.waitForTimeout(2000);
    // let element = await tab.$('div[data-analytics="NavBarProfileDropDown"]');
    // await element.click();
    // await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
})();