const path = require('path');

module.exports = {
    context: path.join(__dirname, 'client'),
    entry: [
        './main.js',
    ],
    output: {
        path: path.join(__dirname, 'client'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {   test: /\.js$/,
                include: [path.resolve(__dirname, "client")],
                exclude: [/node_modules/],
                use:['babel-loader',]
            },

        ],
    },

    resolve: {
        modules: [path.join(__dirname, 'node_modules'),],
        extensions: ['.js', '.jsx',],
    },
};
