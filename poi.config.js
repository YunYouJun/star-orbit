const pkg = require('./package.json')
module.exports = (options, req) => ({
  entry: './src/index.js',
  port: 2333,
  env: {
    APP_DESCRIPTION: pkg.description
  }
})