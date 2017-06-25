import axios from 'axios';
import config from './config'
const get_all_user = function(cb) {
  axios.get(config.host + 'user')
    .then(function(result) {
      cb && cb(result.data)
    })
    .catch(function(e) {
      throw new Error(e)
    })
}
const del_user = function(id, cb) {
  axios.delete(config.host + 'user/del/' + id,)
    .then(function(result) {
      result = result.data
      if (result.code == 0) {
        cb && cb(result.data)
      }
    }).catch(function(e) {
    throw new Error(e);
  })
}
const add_user = function(data, cb) {
  axios.post(config.host + 'user/addUser', data)
    .then(function(result) {
      result = result.data
      if (result.code == 0) {
        cb && cb(result.data)
      }
    }).catch(function(e) {
    throw new Error(e);
  })
}
const getUserById = function(id, cb) {
  axios.get(config.host + 'user/' + id)
    .then(function(result) {
      result = result.data
      if (result.code == 0) {
        cb && cb(result.data)
      }
    }).catch(function(e) {
    throw new Error(e);
  })
}
export{
  get_all_user,
  add_user,
  del_user,
  getUserById
}
