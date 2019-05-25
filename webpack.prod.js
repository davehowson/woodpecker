const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    mode: 'production'
})
