const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.config');
const { mockServer } = require('../mock');
const cssLoaderConfig = require('./common');

const port = 8000;
const host = '127.0.0.1';
const base = {
    secure: true,
    changeOrigin: true,
};

module.exports = env =>
    merge(common(env), {
        mode: 'development',
        devtool: 'inline-source-map',
        output: {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].chunk.js',
            // chunkFilename: '[name].bundle.js'
            // chunkFilename: 'chunk/[id].js',
        },
        target: 'web', // 默认browserlist，会导致热更新失败，开发环境使用web
        module: {
            rules: cssLoaderConfig(),
        },
        plugins: [
            new HotModuleReplacementPlugin(),
            // new BundleAnalyzerPlugin()
        ],
        devServer: {
            historyApiFallback: true,
            open: true,
            hot: true,
            port,
            host,
            setupMiddlewares: mockServer,
            client: {
                overlay: {
                    errors: false,
                    warnings: false,
                },
            },
            proxy: {
                '/mock/api/': {
                    ...base,
                    target: `${host}:${port}`,
                },
                '/local/api/': {
                    ...base,
                    target: 'http://bpp-api.jd.com/bppapi/',
                    pathRewrite: { '^/local/api/': '/datamill/api/' },
                },
                '/datamill/api/': {
                    ...base,
                    target: 'http://4a.brand-man.bdp.jd.com/',
                },
            },
        },
    });
