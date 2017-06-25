var model = require('../../config/model')

const RELATION = model.Relation
const connect = model.connect
const express = require('express')
const router = express.Router()

router.get('/not_relation', function(req, res) {
  const sql = `select * from  users where id not in ( select friendid from relations where userid=${req.query.userid}) and id != ${req.query.userid}`
  connect.query(sql, {type: connect.QueryTypes.SELECT})
      .then(result => {
        res.send(result)
      })
      .catch((e) => {
        throw new Error(e)
      })
})
router.get('/', function(req, res) {
  const sql = `select u.* from users u left join relations r on u.id=r.friendId where r.userId = ${req.query.userId}`
  connect.query(sql, {type: connect.QueryTypes.SELECT})
      .then(result => {
        console.log(result)
        res.send(result)
      })
      .catch(e => {
        throw new Error(e)
      })
  /* RELATION.findAll({
   where: {
   userId: req.query.userId
   }
   })
   .then(result => {
   res.send(result)
   })*/
})
router.post('/add', function(req, res) {
  RELATION.create({
    userId: req.body.userId,
    friendId: req.body.friendId
  })
      .then(result => {
        res.send(result)
      })
})

router.delete('/delete', function(req, res) {
  RELATION.destroy({
    where: {
      $or: [
        {
          $and: {
            userId: req.query.userId,
            friendId: req.query.friendId,
          }
        },
        {
          $and: {
            userId: req.query.friendId,
            friendId: req.query.userId,
          }
        }
      ]
    }
  })
      .then(result => {
        res.send({
          status: 0
        })
      })
})

//获取好友
router.get('/:id', function(req, res) {
  RELATION.findAll({
    where: {
      userid: req.params.userid
    }
  })
      .then(result => {
        res.send(result)
      })
})
module.exports = router
