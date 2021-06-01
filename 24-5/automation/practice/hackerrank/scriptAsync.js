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
    tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1",id);
    await tab.type("#input-2",pw);
    await tab.click(".auth-button");
    await waitAndClick('a[href="/interview/interview-preparation-kit"]');
    await waitAndClick('a[data-attr1="warmup"]');
    await tab.waitForSelector('.js-track-click.challenge-list-item', { visible: true });
    allQuesArray = await tab.$$('.js-track-click.challenge-list-item');
    let allPendingPromises = [];
    for(let i = 0; i < allQuesArray.length; i++) {
        let singleCard = allQuesArray[i];
        let pendingPromise = singleCard.evaluate(function (element) {
            return element.getAttribute("href");
        }, singleCard);
        allPendingPromises.push(pendingPromise);
    }
    let allQuestionLinks = await Promise.all(allPendingPromises);
    for(let i = 0; i < allQuestionLinks.length; i++) {
        let oneQuestionSolutionPromise = await solveQuestion(allQuestionLinks[i]);    
    }
    
    //await console.log
})();

async function solveQuestion(quesLink) {
    await tab.goto("https://www.hackerrank.com"+quesLink);
    await waitAndClick('div[data-attr2="Editorial"]');
    await handleLockBtn();
    solutionCode = await getCode();
    await waitAndClick('div[data-attr2="Problem"]');
    await pasteCode();
}
async function pasteCode() {
    await waitAndClick('.checkbox-input');
    await tab.waitForTimeout(2000);
    await tab.type('.custominput' , solutionCode);
    
    await tab.keyboard.down("Control");
    await tab.keyboard.press("A");
    await tab.keyboard.press("X");
    await tab.click('.monaco-scrollable-element.editor-scrollable.vs');
    await tab.keyboard.press("A");
    await tab.keyboard.press("V");
    await tab.keyboard.up("Control");  
    await tab.click('.ui-btn.ui-btn-normal.ui-btn-primary');
    console.log("Code succesfully submmitted!!");
}
async function getCode() {
    await tab.waitForSelector(".hackdown-content h3" , {visible:true});
    let allCodeNameElements = await tab.$$(".hackdown-content h3");
    let allCodePromise = [];
    for(let i=0; i< allCodeNameElements.length; i++) {
        let codeNamePromise = tab.evaluate( function (elem) {
            return elem.textContent;
        }, allCodeNameElements[i]);
        allCodePromise.push(codeNamePromise);
    }
    let allCodeNames = await Promise.all( allCodePromise );
    for(let i= 0 ;i<allCodeNames.length ; i++){
        if(allCodeNames[i] == "C++"){
            idx = i;
            break;
        }
    }
    let allCodeDiv = await tab.$$(".hackdown-content .highlight"); // document.querySelectorAll
    let codeDiv = allCodeDiv[idx];
    let code = await tab.evaluate(function(elem){ return elem.textContent;   }  , codeDiv);
    return code;
}

async function handleLockBtn() {
    try {
        await tab.waitForTimeout(2000);
        //await tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled' , {visible:true , timeout:5000});
        //let lockButton = await tab.$('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
        //await tab.evaluate(function(elem){ console.log(elem); return elem.click()  } , lockButton);
        await waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
        console.log("Lock Button Found !!");    
    } catch (error) {
        console.log("Lock Button not found !!");
        console.log(error);
    }
    
}


async function waitAndClick(selector) {
    try {
        await tab.waitForSelector(selector, { visible: true });
        await tab.click(selector);    
    } catch (error) {
        throw new Error(error);
    }
    
};