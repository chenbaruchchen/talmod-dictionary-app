require('dotenv').config()

const express = require('express')

const scraper=require('./scraper')
const {query}=require('./db/index')
const getTranslateRoutes=require('./api/translate')

const app = express()
const port = process.env.PORT || 8080

 
app.use('/api/get-translate/', getTranslateRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
 



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

///only for varcel
module.exports = app;
