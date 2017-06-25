import axios from 'axios';
import config from './config'

const get_relation = function(userId, cb) {
  axios.get(`${config.host}relation?userId=${userId}`)
    .then(function(result) {
      cb && cb(result.data)
    })
    .catch(function(e) {
      throw new Error(e)
    })
}

const get_not_relation = function(userId, cb) {
  axios.get(`${config.host}relation/not_relation?userid=${userId}`)
    .then(function(result) {
      cb && cb(result.data)
    })
}
const add_relation = function(data, cb) {
  axios.post(`${config.host}relation/add`, {
    userId: data.userId,
    friendId: data.friendId
  })
    .then(function(result) {
      cb && cb(result.data)
    })
}
const del_relation = function(data, cb) {
  axios.delete(`${config.host}relation/delete?userId=${data.userId}&friendId=${data.friendId}`, result => {
    cb && cb(result);
  })
}
export{
  get_relation,
  get_not_relation,
  add_relation,
  del_relation
}
