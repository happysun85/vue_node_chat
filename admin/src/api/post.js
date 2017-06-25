import axios from 'axios'
import config from './config'

const get_all_post = function(cb) {
  axios.get(config.host + 'post')
    .then(function(result) {
      cb && cb(result.data)
    })
}
const getPostListByUserId = function(id, cb) {
  axios({
    method: 'get',
    url: config.host + 'post?userid=' + id
  })
    .then(function(result) {
      cb && cb(result.data)
    })
}
const addPost = function(data, cb) {
  axios.post(config.host + 'post/addPost', {
    id: data.id,
    title: data.title,
    content: data.content
  })
    .then((result) => {
      cb && cb(result.data);
    })
}
const delPost = function(ids, cb) {
  axios.delete(config.host + 'post/delete?ids=' + ids.join(','))
    .then((result) => {
      cb && cb();
    })
}
const editPost = function(data, cb) {
  axios.put(config.host + 'post/edit', {
    ...data
  }).then(() => {
    cb && cb();
  })
}
export {
  get_all_post,
  getPostListByUserId,
  addPost,
  delPost,
  editPost
}
