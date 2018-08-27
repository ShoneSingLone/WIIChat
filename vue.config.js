const path = require('path')
const WebpackShellPlugin = require('webpack-shell-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
// process.env.NODE_ENV: base or common

let plugins = [],
  baseUrl = '/';

console.log('process.env.NODE_ENV:\n', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  plugins = [
    new WebpackShellPlugin({
      onBuildExit: ['node ./modules/build/copydir']
    })
  ];
  baseUrl = '/brumaire/';
} else {
  // process.env.NODE_ENV: development

}

module.exports = {
  devServer: {
    hot: true
  },
  baseUrl,
  lintOnSave: false,
  configureWebpack: {
    plugins,
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@n': resolve('./node_modules'),
        '@cb': resolve('./src/components/Bootstrap'),
        '@cm': resolve('./src/components/MD'),
        '@material': resolve('./src/components/@material'),
        '@cube': resolve('./src/components/cube-ui/src'),
        '@m': resolve('./modules')
      }
    },
  },
}