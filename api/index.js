require('dotenv').config()

const express = require('express')

const scraper=require('../scraperVarcel')
const {query}=require('../db/index')
const getTranslateRoutes=require('./translate')

 

const app = require('express')();
const { v4 } = require('uuid');

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.use('/api/get-translate/', getTranslateRoutes)

console.log(1)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
 

module.exports = app;
 



 