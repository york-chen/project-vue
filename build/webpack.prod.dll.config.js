const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, '..'),
    mode: 'production',
    entry: {
        vendor1: ['vue','vue-router']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "dll/[name].[chunkHash].dll.js",
        library: "[name]_[chunkHash]",
        publicPath: '/'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devtool: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')//告诉react全家桶,目前是生产环境,不必要的代码就省略掉
        }),
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, '..', "[name]-manifest.json"),
            name: "[name]_[chunkHash]"
        }),
        new HtmlWebpackPlugin({
            title: 'webpack模板',
            filename: 'template.html',
            template: 'index.html',
            inject: 'body',
            minify: {
                removeAttributeQuotes: true//压缩 去掉引号
            }
        }),
    ]
};