const path = require('path')
const htmlPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, '../dev'),
    filename: 'app.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dev'),
    host: 'localhost',
    port: 8000
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)/i,
        use:[{
          loader: 'url-loader',
          options: {
            limit: 5,
            outputPath: 'images/',
          }
        }]
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/i,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: '../fonts/[name].[ext]?[hash:7]',
          prefix: 'font'
        }
      },
      {
        test: /\.vue$/i,
        use: 'vue-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  plugins: [
    new htmlPlugin({
      template: './src/index.html'
    })
  ]
}
