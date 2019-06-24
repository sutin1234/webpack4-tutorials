const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    'mode': 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8000
    },
    resolve: {
        extensions: ['.js', '.css', '.scss', '.sass', '.less', '.png']
    },
    module: {
        rules: [{
                test: /\.(css|scss)$/,
                use: [{
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_component)/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9])?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            }

        ]
    },
    'output': {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.dev.js'
    },
    plugins: [
        new HtmlWepackPlugin({
            template: './src/index.html'
        })
    ]
}