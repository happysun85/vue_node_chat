let config = {}

if (process.env.NODE_ENV == 'production') {
  config = {
    host: 'http://47.94.230.2:3000/',
    uploadHost: 'http://47.94.230.2:3000/upload/'
  }
} else {
  config = {
    host: 'http://localhost:3000/',
    uploadHost: 'http://localhot:3000/upload/'
  }
}
export default config

