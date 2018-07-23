var webpack = require('webpack');

module.exports = {
    entry: "./src/common/index.js",
    entry: { 'src/common/index.min': './src/common/index' },
    output: {
        path: __dirname + '/',
        filename: '[name].js',
        libraryTarget: 'this'
    },
    plugins: [

    ]
}