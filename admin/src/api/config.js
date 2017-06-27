let config = {}

if (process.env.NODE_ENV == 'production') {
  config = {
    host: 'http://localhost:3000/',
    uploadHost: 'http://localhost:3000/upload/'
  }
} else {
  config = {
    host: 'http://localhost:3000/',
    uploadHost: 'http://localhost:3000/upload/'
  }
}
export default config

