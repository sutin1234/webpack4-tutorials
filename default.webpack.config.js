const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');



module.exports = {
    mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
    entry: path.resolve('./src/main.js'),
    'output': {
        path: path.resolve(__dirname, 'dist'),
        filename: process.env.NODE_ENV == 'production' ? 'app.bundle.js' : 'app.dev.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8000
    },
    resolve: {
        extensions: ['.js', '.css', '.scss', '.sass', '.less', '.png']
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
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

    plugins: [
        new HtmlWepackPlugin({
            template: './src/index.html',
        }),
        new PreloadWebpackPlugin({
            rel: 'preload',
            as(entry) {
                if (/\.css$/.test(entry)) return 'style';
                if (/\.(woff|woff2)$/.test(entry)) return 'font';
                if (/\.(png|jpg)$/.test(entry)) return 'image';
                return 'script';
            },
            include: 'allChunks'
        })
    ]
}