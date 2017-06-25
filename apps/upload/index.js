var express = require('express')
var router = express.Router()
var chalk = require('chalk')
const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function(req, file, cb) {
    cb(null, './public/tmp')
  },
  //给上传文件重命名，获取添加后缀名
  filename: function(req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});

var new_multer = multer({
  storage: storage
});

var upload = new_multer.single('logo');

var dataInput = function(req, res, next) {
  upload(req, res, function(err) {
    //添加错误处理
    if (err) {
      return console.log(err);
    }
    next();
  });

}
// var upload = multer({dest: './public/apps/images/logo'});
router.post('/logo', dataInput, function(req, res) {
  res.send({
    state: 0,
    url: req.protocol + '://' + req.get('Host') + '/' + req.file.path.replace('public/', '')
  })
})

module.exports = router


