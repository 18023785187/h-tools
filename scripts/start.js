
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
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          //图片小于8kb，就会被base64处理
          //优点：减小请求数量
          //缺点：图片体积会更大
          limit: 8 * 1024,
          /*url-loader默认使用es6模块化解析，而html-loader引入图片是使用common.js，
            解析时会出现问题:[object Module]
            解决方案：关闭url-loader的es6模块化，使用common.js
          */
          esModule: false,
          //给图片进行重命名 [hash:10]取哈希值前10位，[ext]取原来的扩展名
          // name: '[hash:10].[ext]',
          //打包到build文件夹下面的images文件夹内
          outputPath: 'images'
        }
      },
      {
        test: /\.html$/,
        //处理html文件的img图片(负责引入img，从而能被url-loader处理)
        loader: 'html-loader',
        options: {
          esModule: false,
        }
      }
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
    host: '172.16.1.37',
    open: true,
    hot: true,
    // https: true
  }
})
