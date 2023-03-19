const puppeteer =require('puppeteer') ;

 
  async function scraper(word){
    let res
    const url="https://daf-yomi.com/AramicDictionary.aspx"

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });


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
  module.exports=scraper

 
// //   <input name="ctl00$ContentPlaceHolderMain$txtbox_wordTranslation_searchKeyword" type="text" value="מני"
//  id="ContentPlaceHolderMain_txtbox_wordTranslation_searchKeyword" class="txtbox_wordTranslation_searchKeyword 
// ui-autocomplete-input" style="width:200px;border: outset 1px #c9c8c8" autocomplete="off">