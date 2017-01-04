module.exports = {
  entry: {
    index :'./client/main.js',
    admin :'./client/admin.js'
  },
  output: {
    path: './public/dist',
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
      'vue': '../node_modules/vue/dist/vue.js',
      'vue-router': '../node_modules/vue-router/dist/vue-router.js',
      'vue-resource': '../node_modules/vue-resource/dist/vue-resource.js',
      'markdown': '../node_modules/showdown/dist/showdown.min.js',
      'markdown2': '../../node_modules/showdown/dist/showdown.min.js'
    }
  }
}