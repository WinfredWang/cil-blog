module.exports = {
  entry: './client/main.js',
  output: {
    path: './public/dist',
    filename: 'build.js'
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
      'vue-resource': '../node_modules/vue-resource/dist/vue-resource.js'
    }
  }
}