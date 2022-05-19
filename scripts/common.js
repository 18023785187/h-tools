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
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                    },
                    'corejs': '3',
                    'useBuiltIns': 'usage'
                  }
                ]
              ]
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
