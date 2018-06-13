var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode:"development",
  entry: {
    manager: './src/client/admin/admin.js',
    index: './src/client/index.js',
    login: './src/client/admin/login.js',
  },
  output: {
    path: path.join(__dirname, './dist/client/js'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue': path.resolve(__dirname, 'node_modules/vue/dist/vue.js'),
      'vue-router': path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.js'),
      'vue-resource': path.resolve(__dirname, 'node_modules/vue-resource/dist/vue-resource.js'),
      'element-ui': path.resolve(__dirname, 'node_modules/element-ui/lib/index.js')
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}