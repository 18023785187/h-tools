
const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "source-map",
  entry: {
    'h': path.resolve('./', 'src/index.ts'),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        //处理html文件的img图片(负责引入img，从而能被url-loader处理)
        loader: 'html-loader',
        options: {
          esModule: false,
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./', 'public/index.html'),
      collapseWhitespace: true,
      removeComments: true,
      inject: 'body'
    }),
  ],
  devServer: {
    compress: true,
    port: 8001,
    host: 'localhost',
    open: true,
    hot: true,
    // https: true
  }
})
