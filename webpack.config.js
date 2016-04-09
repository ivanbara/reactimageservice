// webpack.config.js for Babel 6
var path = require('path');
var webpack = require('webpack');

var config = {
 entry: './main.js',
 output: { path: __dirname + '/public/js', filename: 'react-app.js' },
 module: {
   loaders: [
	   {
	     test: /.jsx?$/,
	     loader: 'babel',
	     exclude: /node_modules/,
	     //query: {presets: ['react', 'es2015', 'stage-1']}
	   },
	   //{ test: /\.png$/, loader: "url-loader" },
	   //{ test: /\.jpg$/, loader: "file-loader" },
    ]
 },
 resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};

module.exports = config;