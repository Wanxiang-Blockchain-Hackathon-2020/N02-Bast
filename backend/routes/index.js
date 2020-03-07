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
        console.log("Database is connected 123... ");  
    } else {
        console.log("Error connecting database ... ");  
    }
  });

router.post('/shoppingitem/:id', function(req, res) {
  let value
  for (let i in req.body) {
    value = i
  }
  console.log(value)

  var sql = "select * from shoppingitem" + " where item_id = "+ value ;

  connection.query(sql, function(err, rows, fields) { // 
    // connection.end()
    console.log(rows)
    if (err) {
      console.log(err)
      throw err
    }
    else {
      result = rows
      console.log(typeof result)
      res.setHeader("Access-Control-Allow-Origin", "*");    // 跨域请求？
      if (result[0]) {
        res.send(JSON.stringify(result))
      } else {
        res.status(500).send({})
      }
      // console.log(result)
    }
  });

})
router.post('/makeOrder/:id', function(req, res) {
  let value
  let sum = 0
  for (let i in req.body) {
    value = i
  }
  res.setHeader("Access-Control-Allow-Origin", "*");

  value = JSON.parse(value)
  console.log(value)
  for (let i in value.shoppingCartItem) {
    sum += value.shoppingCartItem[i].price
  }
  console.log(req.params)
  let id = req.params.id
  let sql = "insert into order_tb (user_id, sum) values ( " + id +', ' + sum + ' );' 
  console.log(sql)
  connection.query(sql, function(err, rows, fields) { // 
    // connection.end()
    console.log('rows', rows)
    if (err) {
      console.log(err)
      throw err
    }
    else {
      result = rows
      let order_id = result.insertId
      for (let i in value.shoppingCartItem) {
        let sql = "insert into order_item (order_id, user_id, item_id) values ( " + order_id + ', ' + id +', ' + value.shoppingCartItem[i].item_id + ' );' 
        connection.query(sql)
      }
      sum = value.money - sum
      let sql = 'update t_user set money=' + sum + ' where id=' + id + ';'
      console.log(sql)
      connection.query(sql)
      res.status(200)
      // console.log(result)
    }
  });
})
router.post('/changeaddress/:id', function(req, res) {
  let value
  res.setHeader("Access-Control-Allow-Origin", "*");
  let sum = 0
  for (let i in req.body) {
    value = i
  }
  value = JSON.parse(value)
  console.log(value)
  console.log(req.params)
  let id = req.params.id
  let sql = 'update t_user set address=\' '+  value + '\' where id=' + id + ';'
  console.log(sql)
  connection.query(sql, function(err, rows, fields) { // 
    // connection.end()
    console.log('rows', rows)
    if (err) {
      console.log(err)
      throw err
    }
    else {
      result = rows
      let order_id = result.insertId
      console.log('address change')
      res.status(200).send()
      // console.log(result)
    }
  });
})
router.post('/publish/:id', function(req, res) {
  let value
  res.setHeader("Access-Control-Allow-Origin", "*");
  let sum = 0
  for (let i in req.body) {
    value = i
  }
  value = JSON.parse(value)
  console.log(value)
  console.log(req.params)
  let id = req.params.id
  // let sql = 'update t_user set address=\' '+  value + '\' where id=' + id + ';'
  let sql = "insert into shoppingitem (item_name, item_author, price, info, is_saled) values ( \'" + value.name +'\', ' + id +', '+value.price +', '+ value.info +', '+ 0 + ' );'   
  console.log(sql)
  connection.query(sql, function(err, rows, fields) { // 
    // connection.end()
    console.log('rows', rows)
    if (err) {
      console.log(err)
      throw err
    }
    else {
      result = rows
      let order_id = result.insertId
      console.log('addsuccess')
      res.status(200).send()
      // console.log(result)
    }
  });
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
