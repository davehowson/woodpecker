const webpack = require('webpack');
const path = require('path')

module.exports = {
    entry: './src/main/js/src/index.jsx',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name:  'img/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, './src/main/js/src/'),
        }
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            API_URL: 'http://localhost:5000/api'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
};
