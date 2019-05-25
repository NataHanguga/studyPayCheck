const express = require('express')
const bodyParser = require('body-parser')
const router = require('./app/router')
const path = require('path')
const cors = require('cors')

const app = express()
const paths = '/api/'

app.use(cors());
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'))
app.use(paths, router)
app.listen(3000)

