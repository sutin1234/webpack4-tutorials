const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')


const devMode = process.env.NODE_ENV !== 'production'



module.exports = {
    entry: path.resolve('./src/main.js'),
    'output': {
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: ['.js', '.css', '.scss', '.sass', '.less', '.png']
    },
    optimization: {
        minimizer: [
            new uglifyjsWebpackPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new optimizeCssAssetsWebpackPlugin({
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: true
            })
        ]
    },
    module: {
        rules: [{
                test: /\.(css|scss)$/,
                use: [
                    devMode ? 'style-loader' : miniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
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
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true
            }
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
        }),
        new miniCssExtractPlugin({
            filename: 'bundle.css',
            chunkFilename: '[id].css'
        })
    ]
}