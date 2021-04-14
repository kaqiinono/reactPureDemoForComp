const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const path = require('path');
const common = require('./webpack.config.js');
const cssLoaderInCommon = require('./common');
const { mockServer } = require('../mock');
const { getCSSModuleLocalIdent } = require('./utils');

const port = 8000;
const host = '127.0.0.1';
const base = {
    secure: true,
    changeOrigin: true
};

module.exports = env =>
    merge(common(env), {
        mode: 'development',
        devtool: 'inline-source-map',
        output: {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].chunk.js'
            // chunkFilename: '[name].bundle.js'
            // chunkFilename: 'chunk/[id].js',
        },
        target: 'web', // 默认browserlist，会导致热更新失败，开发环境使用web
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    include: /src/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                // esModule: false,
                                importLoaders: 1,
                                modules: {
                                    compileType: 'module',
                                    mode: 'local',
                                    // auto: true,
                                    // localIdentName: '[path][name]__[local]',
                                    // localIdentContext: path.resolve(__dirname, 'src'),
                                    // localIdentHashPrefix: 'drive'
                                    getLocalIdent: getCSSModuleLocalIdent
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
        plugins: [new HotModuleReplacementPlugin()],
        devServer: {
            historyApiFallback: true,
            open: true,
            hot: true,
            quiet: true,
            port,
            host,
            before: mockServer,
            proxy: {
                '/mock/api/': {
                    ...base,
                    target: `${host}:${port}`
                },
                '/local/api/': {
                    ...base,
                    target: 'http://bpp-api.jd.com/bppapi/',
                    pathRewrite: { '^/local/api/': '/datamill/api/' }
                },
                '/datamill/api/': {
                    ...base,
                    target: 'http://4a.brand-man.bdp.jd.com/'
                }
            }
        }
    });
