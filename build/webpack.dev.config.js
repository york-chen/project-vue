const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

module.exports = {
    mode: "development", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
    entry: "./src/index", // string | object | array  // defaults to './src'
    // Here the application starts executing
    // and webpack starts bundling
    output: {
        // options related to how webpack emits results
        path: path.resolve(__dirname, "../dist"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        filename: "app.js", // string
        // the filename template for entry chunks
        // publicPath: "/dist", // string    // the url to the output directory resolved relative to the HTML page
    },
    module: {
        // configuration regarding modules
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                test: /\.vue$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                exclude: /node_modules/,
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "vue-loader",
                // options for the loader
                options: {
                    transformAssetUrls: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    },
                    loaders: {
                        js: 'happypack/loader?id=babel'
                    }
                }
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                exclude: /node_modules/,
                // flags to apply these rules, even if they are overridden (advanced option)
                use: "happypack/loader?id=babel"
                // options for the loader
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                exclude: /node_modules/,
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "url-loader",
                // options for the loader
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                exclude: /node_modules/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                exclude: /node_modules/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
        /* Advanced module configuration (click to show) */
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
        modules: [
            path.resolve(__dirname, "../src"),
            "node_modules"
        ],
        // directories where to look for modules
        extensions: [".js", ".vue"],
        // extensions that are used
        alias: {
            // a list of module name aliases
            "@": path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.esm.js',
        },
        /* alternative alias syntax (click to show) */
        /* Advanced resolve configuration (click to show) */
    },
    devtool: "inline-source-map", // enum  // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
    context: path.resolve(__dirname, '../'), // string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option
    //   is resolved relative to this directory
    target: "web", // enum  // the environment in which the bundle should run
    // lets you provide options for webpack-serve
    stats: "errors-only",  // lets you precisely control what bundle information gets displayed
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:3000'
        },
        port: 3000,
        contentBase: path.join(__dirname, '../dist'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        open: true,
        openPage: ''
        // publicPath: 'http://localhost:3000/dist/'
        // ...
    },
    plugins: [
        new BundleAnalyzerPlugin({analyzerPort: 8919}),
        new VueLoaderPlugin(),
        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, '..', 'vendor1-manifest.json'))
        }),
        new HtmlWebpackPlugin({
            title: 'vue学习',
            filename: 'index.html',
            template: './dist/template.html',
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: 'babel',
            //如何处理  用法和loader 的配置一样
            loaders: ['babel-loader?cacheDirectory=true'],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        })
    ]
};