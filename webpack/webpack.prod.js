const { merge } = require('webpack-merge');
const path = require('path');
// // css压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// css提取
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.config.js');
const cssLoaderInCommon = require('./common');
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserWebpackPlugin = require('terser-webpack-plugin');
const pkg = require('../package.json');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = env =>
    merge(common(env), {
        mode: 'production',
        // devtool: 'inline-source-map',
        output: {
            filename: 'js/[name].[contenthash:8].js',
            publicPath: `/${pkg.name}/static/`,
            chunkFilename: 'js/[name].[contenthash:8].chunk.js'
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    include: /src/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                // esModule: false,
                                importLoaders: 1,
                                modules: {
                                    compileType: 'module',
                                    mode: 'local',
                                    localIdentName: '[path][name]__[local]__[contenthash:base64:5]',
                                    localIdentContext: path.resolve(__dirname, 'src'),
                                    localIdentHashPrefix: 'drive'
                                }
                            }
                        },
                        ...cssLoaderInCommon
                    ]
                },
                {
                    test: /\.s?css$/,
                    include: path.resolve(__dirname, '../node_modules/@jd'),
                    use: ['style-loader', 'css-loader', ...cssLoaderInCommon]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style/[name]-[contenthash:8].css',
                chunkFilename: 'style/[id]-[contenthash:8].css'
            }),
            new CssMinimizerPlugin(),
            new BundleAnalyzerPlugin()
        ],
        optimization: {
            minimize: true,
            minimizer: [
                // 使用 `...` 扩展现有的 minimizer（即 `terser-webpack-plugin`）
                '...',
                new CssMinimizerPlugin()
            ]
        }
    });
