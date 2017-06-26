var model = require('../../config/model')

const USER = model.User
const connect = model.connect
var express = require('express')

var router = express.Router()

router.get('/', function(req, res) {
  if (req.query.offset && req.query.limit) {
    USER.findAll({
      offset: req.query.offset,
      limit: req.query.limit
    }).then(function(users) {
      res.send(users)
    })
  } else {
    USER.findAll().then(function(users) {
      res.send(users)
    })
  }
})

router.get('/:id', function(req, res) {
  USER.findById(req.params.id)
      .then((result) => {
        res.send({
          code: 0,
          data: result
        })
      })
})

router.post('/addUser', function(req, res) {
  USER.create({
    username: req.body.username,
    nickname: req.body.nickname,
    password: req.body.password,
    logo: req.body.remoteUrl
  })
      .then((result) => {
        res.send({
          code: 0,
          data: result.dataValues
        })
      })
})

router.delete('/del/:id', function(req, res) {
  USER.destroy({
    'where': {
      'id': req.params.id
    }
  }).then((result) => {
    res.send({
      code: 0
    })
  })
})

module.exports = router
