var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  entry: {
    form: './src/js/form.js',
    editor: './src/js/editor.js',
    bootstrap: 'bootstrap-loader/extractStyles',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname + '/public_html/dist'),
    publicPath: 'dist/'
  },
  devtool: "source-map", // or "inline-source-map"
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") },
      { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file' },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015', 'react']
          }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css", {allChunks: false}),
    commonsPlugin
  ]
};