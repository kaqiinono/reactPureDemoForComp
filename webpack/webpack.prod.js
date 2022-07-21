const { merge } = require('webpack-merge');
// // css压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// css提取
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.config');
const cssLoaderConfig = require('./common');
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserWebpackPlugin = require('terser-webpack-plugin');
const pkg = require('../package.json');

module.exports = env =>
    merge(common(env), {
        mode: 'production',
        // devtool: 'inline-source-map',
        output: {
            filename: 'js/[name].[contenthash:8].js',
            publicPath: `/${pkg.name}/static/`,
            chunkFilename: 'js/[name].[contenthash:8].chunk.js',
        },
        module: {
            rules: cssLoaderConfig(MiniCssExtractPlugin.loader),
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style/[name]-[contenthash:8].css',
                chunkFilename: 'style/[id]-[contenthash:8].css',
            }),
            new CssMinimizerPlugin(),
        ],
        optimization: {
            minimize: true,
            minimizer: [
                // 使用 `...` 扩展现有的 minimizer（即 `terser-webpack-plugin`）
                '...',
                new CssMinimizerPlugin(),
            ],
        },
    });
