var path = require('path');

module.exports = {
  entry: {
    index: './app/client/index.js',
    admin: './app/client/admin.js'
  },
  output: {
    path: path.join(__dirname, './app/public/dist'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue': path.resolve(__dirname, 'node_modules/vue/dist/vue.js'),
      'vue-router': path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.js'),
      'vue-resource': path.resolve(__dirname, 'node_modules/vue-resource/dist/vue-resource.js'),
      'markdown': path.resolve(__dirname, 'node_modules/showdown/dist/showdown.min.js')
    }
  }
}