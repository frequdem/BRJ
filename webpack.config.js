var webpack = require('webpack');
var pageConfig = require('./page.config');
module.exports = {
    entry: pageConfig,
    output: {
        path: __dirname,
        filename: "[name].js"
        },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['babel-loader', 'babel'], exclude: /node_modules/}
        ]
    },
    resolve:{
        extensions:['','.js','.json']
    },
    plugins: [

    ]
}