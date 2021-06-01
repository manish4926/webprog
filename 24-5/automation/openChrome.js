const puppeteer = require('puppeteer')
const browser = puppeteer.launch( { 
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
  executablePath: 'C://Program Files (x86)//Google//Chrome//Application//chrome.exe' })