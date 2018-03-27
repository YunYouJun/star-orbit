const pkg = require('./package.json')
module.exports = (options, req) => ({
  entry: './src/index.js',
  port: 2333,
  homepage: './',
  env: {
    APP_DESCRIPTION: pkg.description
  }
})