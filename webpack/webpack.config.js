const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const include = [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules/@jd')];

module.exports = env => {
    const plugins = [
        new HtmlWebpackPlugin({
            title: 'DEMO',
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
            minify: {
                // 压缩html
                collapseWhitespace: true, // 压缩空白
                removeComments: true // 去除注释
            }
            // chunks: Object.keys(entry) 单页面不需要，默认提取所有chunks
        }),
        new CleanWebpackPlugin(),
        // new FriendlyErrorsWebpackPlugin(),
        new ESLintPlugin({
            quiet: !env.production,
            failOnError: !!env.production,
            emitWarning: false,
            extensions: ['js', 'jsx', 'ts', 'tsx']
        }),
        new webpack.DefinePlugin({
            isDev: !env.production
        }),
        // 忽略解析三方包里插件
        new webpack.IgnorePlugin(/\.\/locale/, /moment/)
    ];
    return {
        entry: path.resolve(__dirname, '../src/entry/index.js'),
        output: {
            // 根据入口起点名称动态生成 bundle 名称
            path: path.resolve(__dirname, '../dist'),
            // filename: 'js/[name].js',
            publicPath: '/'
        },
        plugins,
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/i,
                    // include: /(src)|(node_modules\/@jd)/,
                    include,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                            // presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
                        }
                    }
                },
                // 处理图片资源
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    // include: /(src)|(entry)|(node_modules\/@jd)/,
                    include,
                    type: 'asset/resource',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 10 * 1024 // 4kb
                        }
                    },
                    generator: {
                        filename: 'static/images/[name][ext][query]'
                    }
                },
                // 处理字体文件
                {
                    test: /\.(eot|ttf|woof|woof2|woff)$/i,
                    include,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/fonts/[name][ext][query]'
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx', 'css', '.scss'],
            alias: {
                '@jd/react-grace': '@jd/react-grace/dist/widget/'
            }
        },
        optimization: {
            concatenateModules: true,
            // sideEffects: true,
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                // 分割代码块
                cacheGroups: {
                    vendor: {
                        // 抽離 node_modules
                        test: /node_modules/,
                        chunks: 'all',
                        priority: 20, // 设置优先级，首先抽离第三方模块,默认0
                        name: 'vendor',
                        enforce: true
                    },
                    // 抽離公共模块
                    common: {
                        chunks: 'all',
                        minSize: 0,
                        name: 'common',
                        minChunks: 2,
                        priority: 10
                    }
                    // styles: {
                    //   name: 'styles',
                    //   test: /\.(scss|css)$/,
                    //   chunks: 'all',
                    //   enforce: true,
                    // },
                }
            }
        }
    };
};
