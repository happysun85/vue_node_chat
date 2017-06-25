var model = require('../../config/model')

const POST = model.Post
const connect = model.connect
const express = require('express')
const moment = require('moment')
const chalk = require('chalk')
const router = express.Router()
router.get('/', function(req, res) {
  let sql = 'select u.username, p.*,DATE_FORMAT(p.createdAt, "%Y-%m-%d") AS createdAt,DATE_FORMAT(p.updatedAt, "%Y-%m-%d") AS updatedAt from posts as p LEFT JOIN users as u on p.userId=u.id where 1=1'
  if (req.query.userid) {
    sql += ' and userid =' + req.query.userid
  }
  connect.query(sql,
      {type: connect.QueryTypes.SELECT})
      .then(function(result) {
        res.send(result)
      })
      .catch(function(e) {
        throw new Error(e);
      })
})

router.post('/addPost', function(req, res) {
  POST.create({
    userId: req.body.id,
    title: req.body.title,
    content: req.body.content,
    image: ''
  })
      .then(result => {
        res.send(result)
      })
})
router.delete('/delete', function(req, res) {
  POST.destroy({
    where: {
      id: {
        $in: req.query.ids.split(',')
      }
    }
  }).then(result => {
    res.send({
      code: 0,
      data: result
    })
  })
})
router.put('/edit', function(req, res) {
  POST.update({
    title: req.body.title,
    content: req.body.content,
    updateAt: new Date()
  }, {
    where: {
      id: req.body.id
    }
  }).then(result => {
    res.send({
      code: 0
    })
  })
})
module.exports = router
