
function main(word){
    let chrome = {};
    let puppeteer;
    
    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
      // running on the Vercel platform.
      chrome = require('chrome-aws-lambda');
      puppeteer = require('puppeteer-core');
    } else {
      // running locally.
      const scraper=require('./scraper')
      scraper(word)
    }
    
    const getData = async () => {
      try {
        let browser = await puppeteer.launch({
          args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
          defaultViewport: chrome.defaultViewport,
          executablePath: await chrome.executablePath,
          headless: true,
          ignoreHTTPSErrors: true,
        });


        async function scraping() {

            let res
            const url="https://daf-yomi.com/AramicDictionary.aspx"
            const page = await browser.newPage();
  
            await page.goto(url);
            const inputId="#ContentPlaceHolderMain_txtbox_wordTranslation_searchKeyword"
        
            // Types slower, like a user
            await page.type(inputId, word, {delay: 100});
            
            let a=await page.$(inputId)
             
        
            const searchResultSelector = '#ContentPlaceHolderMain_imgbtn_wordTranslation_searchKeyword';
            await page.waitForSelector(searchResultSelector);
            await page.click(searchResultSelector);
        
        
            const serchResultId="#ContentPlaceHolderMain_listview_wordTranslation_translations_ctrl0_lbl_wordTranslation_translatedWord_0"
        
         
            
        
            
            ////not to much if word dosent apper
            const options={timeout: '1000'}
        
            try {
              await page.waitForSelector(serchResultId,options);
        
        
              const serchResultEl=await page.$(serchResultId)
              const serchResultText=await (await serchResultEl.getProperty('textContent')).jsonValue()
          
              console.log(serchResultText)
              return serchResultText
            } catch (error) {
              console.log(error)
              console.log("continue after error")
        
              return "none word was found"
            }
           
            
            return res 
        }

        const res=await scraping()
        return res
       


      } catch (err) {
        console.error(err);
        return null;
      }
    }
}
module.exports.default=main