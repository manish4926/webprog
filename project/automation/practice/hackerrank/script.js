const puppeteer = require('puppeteer');
const id = "pikikep510@geekale.com";
const pw = "123456789";
let tab;
let idx;
let solutionCode;

const browserPromise = puppeteer.launch( { 
    headless: false,
    defaultViewport: null,
        args: ["--start-maximized"],
        executablePath: 'C://Program Files (x86)//Google//Chrome//Application//chrome.exe' });

browserPromise
    .then(function (browser) {
        return browser.pages();
    })
    .then(function (pages) {
        tab = pages[0];
        return tab.goto("https://www.hackerrank.com/auth/login");
    })
    .then(function () {
        return tab.type("#input-1",id);
    })
    .then(function () {
        return tab.type("#input-2",pw);
    })
    .then(function () {
        return tab.click(".auth-button");
    })
    .then(function () {
        return waitAndClick('a[href="/interview/interview-preparation-kit"]');
    })
    .then(function () {
        return waitAndClick('a[data-attr1="warmup"]');
    })
    .then(function () {
        return tab.waitForSelector('.js-track-click.challenge-list-item', {
            visible:true,
        });
    })
    .then(function () {
        return tab.$$('.js-track-click.challenge-list-item');
    })
    .then(function (allQuesArray) {
        let allPendingPromises = [];
        for(let i = 0; i < allQuesArray.length; i++) {
            let singleCard = allQuesArray[i];
            let pendingPromise = singleCard.evaluate(function (element) {
                return element.getAttribute("href");
            }, singleCard);
            allPendingPromises.push(pendingPromise);
        }

        let allPromisesCombined = Promise.all(allPendingPromises);
        
        return allPromisesCombined;
    })
    .then(function (allQuestionLinks) {
        let oneQuestionSolutionPromise = solveQuestion(allQuestionLinks[0]);
        for(let i=1 ; i<allQuesLinks.length ; i++){
            oneQuesSolvePromise = oneQuesSolvePromise.then(function(){
                let nextQuesSolvePromise = solveQuestion(allQuesLinks[i]);
                return nextQuesSolvePromise;
            })
            }
            
        return oneQuestionSolutionPromise;
    })
    .catch(function(err){
        console.log(err);
    });
    


function waitAndClick(selector) {
  return new Promise(function (scb, fcb) {
    let waitPromise = tab.waitForSelector(selector, { visible: true });
    waitPromise
      .then(function () {
        return tab.click(selector);
      })
      .then(function () {
        scb();
      })
      .catch(function () {
        fcb();
      });
  });
}

function solveQuestion(quesLink) {
    return new Promise( function (scb, fcb) {
        let gotToPromise = tab.goto("https://www.hackerrank.com"+quesLink);
        gotToPromise
            .then(function () {
                return waitAndClick('div[data-attr2="Editorial"]');
            })
            .then(function () {
                getCode();
            })
            .then(function () {
                return waitAndClick('div[data-attr2="Problem"]');
            })
            .then(function(){
                return pasteCode();
            })
            .then(function(){
                return tab.click('.ui-btn.ui-btn-normal.ui-btn-primary');
            })
            .then(function(){
                console.log("Code succesfully submmitted!!");
            })
            .then(function(){
                scb();
            })
            .catch(function(error){
                fcb(error);
            })
    })
}

function getCode() {
    return new Promise(function(scb , fcb){
        let waitPromise = tab.waitForSelector(".hackdown-content h3" , {visible:true});
        waitPromise.then(function(){
            return tab.$$(".hackdown-content h3");
        })
        .then( function (allCodeNameElements) {
            let allCodePromise = [];

            for(let i=0; i< allCodeNameElements.length; i++) {
                let codeNamePromise = tab.evaluate( function (elem) {
                    return elem.textContent;
                }, allCodeNameElements[i]);
                allCodePromise.push(codeNamePromise);
            }

            let combinedPromise = Promise.all( allCodePromise );
            return combinedPromise;
        })
        .then( function (allCodeNames) {
            for(let i= 0 ;i<allCodeNames.length ; i++){
                if(allCodeNames[i] == "C++"){
                    idx = i;
                    break;
                }
            }
            return tab.$$(".hackdown-content .highlight"); // document.querySelectorAll
        })
        .then(function(allCodeDiv){
            let codeDiv = allCodeDiv[idx];
            return tab.evaluate(function(elem){ return elem.textContent;   }  , codeDiv);
        })
        .then( function (code) {
            solutionCode = code
            scb();
        })
        .catch(function(error){
        fcb(error);
      })
    });
}

function handleLockBtn(){
    return new Promise(function(scb , fcb){
      let waitForLockBtn = tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled' , {visible:true , timeout:5000});
      waitForLockBtn.then(function(){
        return tab.$('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
      })
      .then(function(lockButton){
        return tab.evaluate(function(elem){ return elem.click()  } , lockButton);
      })
      .then(function(){
        // Lock Button Found !!
        console.log("Lock Button Found !!");
        scb();
      })
      .catch(function(){
        // Lock Button Not Found !!
        console.log("Lock Button not found !!");
        scb();
      })
    })
  }

function pasteCode() {
    return new Promise(function (scb, fcb) {
        let waitAndClickPromise = waitAndClick('.checkbox-input');
        waitAndClickPromise.then(function(){
            return tab.waitForTimeout(2000);
        })
        .then(function(){
            return tab.type('.custominput' , solutionCode);
        })
        .then(function(){
            return tab.keyboard.down("Control");
        })
        .then(function(){
            return tab.keyboard.press("A");
        })
        .then(function(){
            return tab.keyboard.press("X");
        })
        .then(function(){
        return tab.click('.monaco-scrollable-element.editor-scrollable.vs');
      })
      .then(function(){
        return tab.keyboard.press("A");
      })
      .then(function(){
        return tab.keyboard.press("V");
      })
      .then(function(){
        return tab.keyboard.up("Control");
      })
      .then(function(){
        scb();
      })
    })
}