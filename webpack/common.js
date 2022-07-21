const path = require('path');
const { getCSSModuleLocalIdent } = require('./utils');

module.exports = (styleLoader = 'style-loader') => [
    {
        test: /\.s?css$/,
        include: [
            path.resolve(__dirname, '../src'),
            // path.resolve(__dirname, '../node_modules/@jd')
            /@jd[\\/](?!(jmtd$))/,
        ],
        use: [
            styleLoader,
            {
                loader: 'css-loader',
                options: {
                    // esModule: false,
                    importLoaders: 1,
                    modules: {
                        auto: /[\\/]src[\\/].*[\\/]\w+.scss/,
                        getLocalIdent: getCSSModuleLocalIdent,
                    },
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [['postcss-preset-env']],
                    },
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                },
            },
        ],
    },
];
