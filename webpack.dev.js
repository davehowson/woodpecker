const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    output: {
        path: __dirname,
        filename: './dev-server/bundle.js',
        publicPath: '/'
    },
    mode: "development",
    devtool: '',
    devServer: {
        contentBase: './dev-server',
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template: './dev-server/index.html'
        }),
        // new BundleAnalyzerPlugin()
    ],
});
