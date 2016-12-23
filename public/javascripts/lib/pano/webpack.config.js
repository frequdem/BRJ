var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: path.join(__dirname, './src/Component/Compass.js'),
    output: {
        path: './built/' ,
        filename: "Pano.js"
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