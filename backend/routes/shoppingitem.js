var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var qs = require('querystring');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database: 'nodejs'
    // tables: 't_users'
  });
  connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... ");  
    } else {
        console.log("Error connecting database ... ");  
    }
  });

  router.post('/:id', function(req, res) {
    console.log(req, res)
})