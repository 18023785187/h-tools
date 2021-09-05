const { resolve } = require('path')
const WebpackBar = require('webpackbar');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'h-tools.min.js',
        library: 'h',
        libraryTarget: 'umd'
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
    plugins: [
        new WebpackBar()
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            'utils': '@/utils'
        },
        extensions: ['.ts', '.js', '.json'],
    },
    devtool: 'eval-source-map'
}
