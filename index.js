const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')

const config = require('./config')
const get = require('./get')
const auth = require('./auth')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const db = mysql.createPool({
  user: 'root',
  password: 'ogid01',
  database: 'ordinarygoddesses',
  host: 'localhost',
  port: '3306',
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, x-access-token, user-details, event-booking')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  }
  else {
    next()
  }
})

app.use('/get', get({db, express}))
app.use('/auth', auth({db, express, bcrypt, jwt, jwtToken: config.jwtToken}))

app.listen(3001, () => {
  console.log('Server running on 127.0.0.1:3001')
})