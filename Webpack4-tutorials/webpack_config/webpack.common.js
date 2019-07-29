const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
    // const ModernizrWebpackPlugin = require('modernizr-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'



module.exports = {
    entry: path.resolve('./src/main.js'),
    'output': {
        path: path.resolve(__dirname, '../dist'),
        // chunkFilename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.css', '.scss', '.sass', '.less', '.png'],
        alias: {
            modernizr$: path.resolve(__dirname, 'modernizr.js')
        }
    },
    optimization: {
        splitChunks: {
            automaticNameDelimiter: '.',
            cacheGroups: {
                vendor: {
                    test: /[\/]node_modules[\/]/,
                    priority: 1,
                    chunks: 'all',
                }
            },
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,

                terserOptions: {
                    ecma: 6
                }
            }),
            new OptimizeCssAssetsWebpackPlugin({
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    },

                },
                canPrint: true
            })
        ]
    },
    module: {
        rules: [{
                test: /\.(css|scss)$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
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
                    },


                ]
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_component)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        sourceMap: true
                    }
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
            },
            {
                test: /modernizr/,
                loader: 'imports-loader?this=>window!exports-loader?window.Modernizr'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true
            },
            links: [
                devMode ? 'modernizr.js' : 'modernizr-bundle.js'
            ]
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
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
            chunkFilename: '[id].css'
        }),
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets'
        }])
    ]
}