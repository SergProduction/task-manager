const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const prod = process.env.NODE_ENV === 'prod'

let webpackConfig = {
  context: __dirname,
  entry: {
    task: './source/task',
  },
  output: {
    path: __dirname + '/public/js',
    filename: '[name].js',
    library: '[name]'
  },
  watch: true,
  resolve: {
    moduleExtensions: ['.', './node_modules'],
    extensions: ['.js', '.jsx']
  },
  //devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: ['stage-2','es2015', 'react']
        }
      }
    ]
  },
  devServer: {
    contentBase: [
      path.join(__dirname, "bower_components/"),
      path.join(__dirname, "public/")
    ],
    publicPath: '/js/',
    watchContentBase: true,
    compress: true,
    port: 9000
  }
}

if(prod){
  webpackConfig = Object.assign(webpackConfig, {
    devServer: false,
    watch: false,
    plagin: [
      new UglifyJSPlugin()
    ]
  })
}

module.exports = webpackConfig