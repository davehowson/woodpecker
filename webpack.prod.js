const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
    output: {
        path: path.join(__dirname, 'src', 'main', 'resources', 'static'),
        filename: './built/bundle.js',
        publicPath: '/'
    },
    mode: 'production',
    plugins: [
        new CompressionPlugin({
            test: /\.(js|css|html|svg)$/,
        })
    ]
});
