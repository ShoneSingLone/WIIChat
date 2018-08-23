const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    hot: true
  },
  lintOnSave: false,
  configureWebpack: {
    plugins: [],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@n': resolve('./node_modules'),
        '@m': resolve('./modules')
      }
    },
  },
}