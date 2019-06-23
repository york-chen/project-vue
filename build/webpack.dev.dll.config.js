const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    context: path.resolve(__dirname, '..'),
    mode: 'development',
    entry: {
        vendor1: ['vue','vue-router','axios','vuex'],
        vendor2:['element-ui','element-ui/lib/theme-chalk/index.css']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "dll/js/[name].[chunkHash].dll.js",
        library: "[name]_[chunkHash]",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ttf|woff)$/,
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "url-loader",
                // options for the loader
                options: {
                    limit: 10000,
                    name:'dll/resource/[name].[ext]'
                },
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new MiniCssExtractPlugin({
            filename: 'dll/css/[name].[chunkHash].dll.css'
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
            inject: 'body'
        }),
    ]
};