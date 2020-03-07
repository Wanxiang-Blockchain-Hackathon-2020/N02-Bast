var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var qs = require('querystring');

/* GET users listing. */
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

// login
router.post('/login', function(req, res) {
  console.log(req.cookies, 'req.cookies')
  let value
  for (let i in req.body) {
    value = i
  }
  value = JSON.parse(value)
  console.log(value)
  let email = value.email
  let password = value.password
  console.log(email, password, 'vlaue')
  // console.log(req.body.data)

  var sql = "select * from t_user";
  // var sql = 'insert into t_user'
  // let result
  if(email){
    sql += " where email = '"+ email +"'";
    // sql += '(' + value.email + ', ' + value.password + ', ' + value.username + ')'
  }
  connection.query(sql, function(err, rows, fields) { //  signin
    // connection.end()
    console.log(rows)
    if (err) {
      console.log(err)
      throw err
    }
    else {
      console.log(rows, 'rows');
      result = rows
      res.setHeader("Access-Control-Allow-Origin", "*");    // 跨域请求？
      if (result[0]) {
        console.log(password === result[0].password, result.length)
        if (result.length !== 0 && password === result[0].password) {  // find the user
          res.cookie('user', {username: result[0].username},  {maxAge: 600000 , httpOnly: false})
          res.send(JSON.stringify(result))
          } else {                       // didn't find the user
          res.status(500).send({})
        }
      } else {
        res.status(500).send({})
      }
      // console.log(result)
    }
  });

  //res.status(200).send(result, 'result')
  // res.status(200).send((result).toString())
});

router.get('/logout', function (req,res,next){ 
  //删除Cookie  
  res.clearCookie('user');
  res.redirect('index'); 
})

// signin
router.post('/signin', function(req, res){
  // console.log(req.body)
  let value
  for (let i in req.body) {
    value = i
  }
  value = JSON.parse(value)
  console.log(value)
  // let result
  let email = value.email
  let password = value.password
  let username = value.username
  console.log(email, password, username)
  var sqlSignin = 'insert into t_user SET ?'
  // if(email){
  //   sql += 'values' + '(' + value.email + ', ' + value.password + ', ' + value.username + ')'
  // }
  let sqlparams = {email:email, password:password, username:username}
  var sqlLogin = "select * from t_user";
  // var sql = 'insert into t_user'
  // let result
  if(email){
    sqlLogin += " where email = '"+ email +"'";
    // sql += '(' + value.email + ', ' + value.password + ', ' + value.username + ')'
  }

  connection.query(sqlLogin, function(err, rows, fields){ // whether email is exist
    console.log(rows.length)
    if (err) {
      console.log(err)
      throw err
    } else {
      res.setHeader("Access-Control-Allow-Origin", "*");    // 跨域请求
      if (rows.length === 0) {
        connection.query(sqlSignin, sqlparams, function(err, result) { //  login
          // connection.end()
          if (err) {
            console.log(err)
            throw err
          }
          else {
            // console.log(result);
           //  result = rows
            res.setHeader("Access-Control-Allow-Origin", "*");    // 跨域请求？
            if (result) {
              // console.log(result)
              // if (result.length !== 0 && password === result[0].password) {  // find the user
              //   res.send(JSON.stringify(result))
              //   } else {                       // din't find the user
              //   res.status(500).send({})
              // }
              res.status(200).send({})
            } else {
              res.status(500).send({})
            }
            // console.log(result)
          }
        })
      } else {
        console.log('else')
        res.status(500).send({})
      }
    }
  } )
})
module.exports = router;
