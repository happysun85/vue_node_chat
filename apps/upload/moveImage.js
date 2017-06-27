var fs = require('fs')

var moveImage = function(url) {
  var readStream = fs.createReadStream(url)
  var target = readStream.path.replace('tmp', 'images');
// var writeStream = fs.createWriteStream(target)

//复制文件
// readStream.pipe(writeStream)
// 移动文件同步
  try {
    fs.renameSync(url, target);
  } catch (e) {
    throw new Error('图片上传失败')
  }
//移动文件,异步
  /*fs.rename(url, target, function(err) {
   if (err) {
   throw err;
   }
   fs.stat(target, function(err, stats) {
   if (err) {
   throw err;
   }
   console.log('stats: ' + JSON.stringify(stats));
   });
   });*/
}
module.exports = moveImage
