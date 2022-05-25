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
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          // 图片小于 8 kb，就会被 base64 处理
          // 优点：减小请求数量
          // 缺点：图片体积会更大
          limit: 8 * 1024,
          /* url-loader 默认使用 es6 模块化解析，而 html-loader 引入图片是使用 common.js，
             解析时会出现问题: [object Module]
             解决方案：关闭 url-loader 的 es6 模块化，使用 common.js
          */
          esModule: false,
          //给图片进行重命名 [hash:10] 取哈希值前 10 位，[ext] 取原来的扩展名
          // name: '[hash:10].[ext]',
          //打包到 build 文件夹下面的 images 文件夹内
          outputPath: 'images'
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                pulgins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name][ext]'
        }
      },
      {
        // ts 文件使用了 babel，ts-loader
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                debug: true
                // 我们不能使用 module 的配置关键字，因为如果此处传入了这一参数内容 webpack 在打包编译的时候将会错误。
              }]]
            }
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve('./', 'src'),
      'utils': '@/utils',
    },
    extensions: ['.ts', '.js', '.json'],
  },
}
