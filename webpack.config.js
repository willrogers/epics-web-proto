const path = require('path');

module.exports = {
    mode: 'development',
    context: path.join(__dirname, './client'),
    entry: [
        './main.js',
    ],
    output: {
        path: path.join(__dirname, './client'),
        filename: 'bundle.js',
    },
    devtool: '#inline-source-map',
    module: {
        rules: [
            {
                /* These are the directories on which we run babel-loader */
                test: /\.js$/,
                include: [path.resolve(__dirname, 'client'), path.resolve(__dirname, 'tests')],
                exclude: [/node_modules/],
                use:['babel-loader']
            },

        ],
    },

    resolve: {
        modules: [path.join(__dirname, 'node_modules'),],
        extensions: ['.js', '.jsx',],
    },
};
