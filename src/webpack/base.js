'use strict';
const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const utils = require('./utils');


let pathsToClean = [
    'build'
];

let cleanOptions = {
    root: __dirname,
    verbose: false,
    dry: false
};

module.exports = {
    output: {
        path: resolveApp('dist'),
        filename: 'assets/js/[name].[hash:4].js',
        chunkFilename: 'assets/js/[name].[hash:4].chunk.js',
        publicPath: '/',
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            assets: utils.resolve('../src/assets'),
            pages: utils.resolve('../src/pages'),
            components: utils.resolve('../src/components'),
            containers: utils.resolve('../src/containers'),
            constants: utils.resolve('../src/constants'),
            data: utils.resolve('../src/data'),
            utils: utils.resolve('../src/utils'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new HtmlWebPackPlugin({
            filename: './index.html',
            template: './src/index.html',
            favicon: './src/assets/favicon.ico'
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {from: 'src/assets/images', to: 'assets/images'},
        ])
    ]
};
