// notice here I'm requiring my database adapter file
// and not requiring node-postgres directly

const  express = require("express");
const db = require('../db/index')
const scraper=require('../scraper')


 
const router = express.Router();


router.get('/', (req, res) => {
 
    res.send('ppp')
    })


router.get('/:word', (req, res) => {

    const word=req.params.word

async function getWord(params) {

    try {
        const { rows } = await db.query(`SELECT * FROM dictionary WHERE aramic= '${word}'`)
         
         if(rows.length===0) return null
        else{
           
         return(rows[0])
        }
    } catch (error) {
       return (null)
    }
     
}

(async function main(){
   const wordFromDb=await getWord()
   if (wordFromDb!==null) {
    console.log(wordFromDb)
    return res.send(wordFromDb.translate)
   }else{
    const wordFromScarper=await scraper(word)
    console.log(wordFromScarper)
    await addWord(word,wordFromScarper)
     return res.send(wordFromScarper)
   }
})()
 
async function createTable() {

    //uniqe by aramic word
    const query = `
    CREATE TABLE IF NOT EXISTS "${"dictionary"}" (
        "id" SERIAL,
        "aramic"    TEXT     NOT NULL UNIQUE,
        "translate"    TEXT     NOT NULL,
        "rate" INT,
        PRIMARY KEY ("id")
    );`;

    const { rows } = await db.query(query)
}
async function addWord(word,translate) {
    console.log('addWord')
    // const { word } = req.params

    let query=`insert into dictionary (aramic, translate,rate) values ('${word}', '${translate}',1)`

  console.log(query)

    try {
        const { rows } = await db.query(query)
 
    } catch (error) {
       console.log(error)
    }
 
}
 
 
 })

module.exports=router

 
 
// ... many other routes in this file