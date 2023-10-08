const path = require('path')
const commonConfig = require('./common')
const { merge } = require('webpack-merge')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = merge(commonConfig, {
  mode: "production",
  entry: {
    'h-tools': path.resolve('./', 'src/index.ts'),
    'h-tools.min': path.resolve('./', 'src/index.ts'),
  },
  optimization: {
    usedExports: true, // 表示只导出那些外部使用了的那些成员
    minimize: true, // 压缩模块
    concatenateModules: true, // 合并模块
    minimizer: [
      new TerserWebpackPlugin({
        include: /\.min/,
      })
    ],
  },
})
