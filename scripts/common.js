const path = require('path')

module.exports = {
  output: {
    path: path.resolve('./', 'build'),
    filename: '[name].js',
    library: 'h',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        //ts文件使用了babel，ts-loader
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                debug: true
                // 我们不能使用module的配置关键字，因为如果此处传入了这一参数内容webpack在打包编译的时候将会错误。
              }]]
            }
          },
          'ts-loader',
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve('./', 'src'),
      "utils": "@/utils",
    },
    extensions: ['.ts', '.js', '.json'],
  },
}
