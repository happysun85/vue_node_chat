const express = require('express')
const app = express()

app.use(express.static(__dirname + '/admin/dist'));

app.use('/', function(req, res) {
  res.send('hello world');
})
app.listen('8080')
