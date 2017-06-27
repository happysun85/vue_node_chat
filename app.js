const express = require('express')
const app = express()
const cors = require('cors')              //最简单的跨域

app.use(cors())
const bodyParser = require('body-parser')

app.set('json space', 4)                  //json数据就是带上格式返回到前端
app.use(bodyParser({
  urlencoded: false
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false})); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/admin/dist/'));

app.get('/', function(req, res) {
  res.send('hello world')
})

var user = require('./apps/user')
var post = require('./apps/post')
var upload = require('./apps/upload')
var relations = require('./apps/relations')
app.use('/upload', upload)
app.use('/user', user)
app.use('/post', post)
app.use('/relation', relations)

process.env.PORT = 3000

app.listen(process.env.PORT)
