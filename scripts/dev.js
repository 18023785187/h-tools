
const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "source-map",
  entry: './dev/index.ts',
  module: {
    rules: [
      {
        test: /\.html$/,
        // 处理 html 文件的 img 图片 ( 负责引入 img，从而能被 url-loader 处理 )
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
