const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/main.js',
    'mode': 'development',
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