const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, './src'),
    entry: [
        './app.js',
    ],
    mode: 'development',
    output: {
        path: path.resolve(__dirname),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                /* These are the directories on which we run babel-loader */
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'tests')],
                exclude: [/node_modules/],
                use:['babel-loader']
            },

        ],
    },

    resolve: {
        modules: [path.join(__dirname, 'node_modules'),],
        extensions: ['.js', '.jsx',],
    },
    devServer: {
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
};
