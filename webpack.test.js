const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
    output: {
        path: path.join(__dirname, 'src', 'main', 'resources', 'static'),
        filename: './built/bundle.js',
        publicPath: '/'
    },
    mode: "production",
    plugins: [

        new BundleAnalyzerPlugin(),
        new CompressionPlugin({
            test: /\.(js|css|html|svg)$/,
        })
    ],
});
