const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
    context: path.resolve(__dirname, '..'),
    mode: 'development',
    entry: {
        vendor1: ['axios', 'qs'],
        vendor2: ['vue', 'vue-router', 'vue-axios', 'vuex', 'element-ui', 'element-ui/lib/theme-chalk/index.css']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "static/js/[name].[chunkHash].js",
        library: "[name]",
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
                test: /\.(png|jpe?g|gif|svg)$/,
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "url-loader",
                // options for the loader
                options: {
                    limit: 10000,
                    name: 'static/images/[name].[contenthash:8].[ext]'
                },
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            },
            {
                test: /\.(ttf|woff)$/,
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "url-loader",
                // options for the loader
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[contenthash:8].[ext]'
                },
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'element-ui$': 'element-ui/lib/index.js'
        }
    },
    plugins: [
        new BundleAnalyzerPlugin({analyzerPort: 8090}),
        new CompressionPlugin({}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[chunkHash].css'
        }),
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, '..', "[name]-manifest.json"),
            name: "[name]"
        }),
        new HtmlWebpackPlugin({
            title: 'webpack模板',
            filename: 'template.html',
            template: 'index.html',
            inject: 'body'
        }),
    ]
};