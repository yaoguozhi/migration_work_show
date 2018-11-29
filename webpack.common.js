const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const manifest = require('./manifest.json');
const _venderName = manifest.name.split('_');
const venderName = _venderName[0] + '.' + _venderName[1];

const NODE_ENV = process.env.NODE_ENV;

let baseConfig = {
    //devtool: 'source-map', // https://webpack.js.org/configuration/devtool/#special-cases
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: NODE_ENV !== 'production' ? '[name].js' : '[name].[chunkhash:8].js',
        chunkFilename: NODE_ENV !== 'production' ? 'chunks/[name].js' : 'chunks/[name].[chunkhash:8].js',
        publicPath: ''
    },
    resolve: {
        // 定义别名
        alias: {
            'SRC_PATH': path.resolve(__dirname, 'src'),
            // 解决Ant Design中Carousel组件在scale情况下计算宽度错误的bug
            // 以上bug官方已经修复，不需要再自行修改
            // 'react-slick': path.resolve(__dirname, 'src/vender/react-slick')
        },
        // 告诉webpack解析模块时应该搜索哪些目录
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    },
    module: {
        rules: [
            {
                //正则匹配后缀.js文件;
                test: /\.js$/,
                //需要排除的目录
                exclude: /(node_modules|bower_components)/,
                //加载babel-loader转译es6
                loaders: [
                    'babel-loader', // .babelrc 具体配置文件
                    //'eslint-loader'// 必须在 .babelrc 的后面
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192, // <= 8kb的图片base64内联
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'images/'
                }
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192, // <= 8kb的base64内联
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'fonts/'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            exclude: [venderName + '.js', venderName + '.js.map']
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            minChunks: 2
        }),
        new CopyWebpackPlugin([
            { from: './src/static', to: '' }
        ]),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.html',
            favicon: './src/favicon.ico',
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [venderName + '.js'],
            append: false
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [
                'env-config.js', 
            ],
            append: false,
            hash: true
        }),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'server', // static/disabled
            analyzerHost: '127.0.0.1',
            analyzerPort: '8888'
        })
    ]
};

exports.cssRules = {
    test: /\.(css|less)$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                sourceMap: true,
                minimize: true || {/* CSSNano Options */ }
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true
            }
        },
        {
            loader: "less-loader",
            options: {
                sourceMap: true
            }
        }
    ]
};

exports.baseConfig = baseConfig;

