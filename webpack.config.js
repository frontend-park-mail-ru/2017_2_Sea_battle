'use strict';

const webpack = require('webpack');
const path = require('path');


module.exports = {
    entry: './Data/main.js',
    output: {
        path: __dirname,
        filename: './Data/main2.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    cacheDirectory: true
                }
            },
            {
                test: /\.(s)?css$/,
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options:
                            {
                                minimize: true
                            }
                    }
                ]
            },
            {
                test: /\.pug$/,
                loader: "pug-loader"
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};
