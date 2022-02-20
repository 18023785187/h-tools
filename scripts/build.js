
const commonConfig = require('./common');
const { merge } = require('webpack-merge')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(commonConfig, {
    mode: "production",
    module: {
        rules: [
            
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
    ],
    optimization: {
        // 表示只导出那些外部使用了的那些成员
        usedExports: true,
        // 压缩模块
        minimize: true,
        // 合并模块
        concatenateModules: true
    },
    devtool: 'eval-source-map'
})
