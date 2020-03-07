var express = require('express');
var bodyParser = require('body-parser');
var users = require('./routes/users')

var app = express();

app.use(bodyParser.json());

app.use('/api/users', users);

app.get('/', (req, res) => {
    res.send('hello world');
  })

  app.listen(6060,()=>console.log('Running'));