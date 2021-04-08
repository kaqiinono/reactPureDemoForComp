module.exports = [
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [['postcss-preset-env']]
            }
        }
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: true
        }
    }
];
