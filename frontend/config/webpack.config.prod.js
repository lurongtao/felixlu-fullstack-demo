const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    'scripts/app': './src/app.js',
    'vendor/vue': 'vue'
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[hash:6].js'
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
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
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:[
              "env"
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  plugins: [
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('styles/[name]-[hash:6].css').replace('styles/scripts', 'styles')
      }
    }),
    new HtmlPlugin({
      title: 'hello',
      template: './src/index.html',
      filename: './index.html'
    })
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          test: /vue/,
          chunks: 'initial',
          name: 'vendor/vue',
          priority: 10
        }
      }
    }
  }
}
