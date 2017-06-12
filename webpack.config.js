const path = require('path');
const webpack = require('webpack');


module.exports = {
  context: __dirname,
  entry: {
    todo: './source/todo',
  },
  output: {
    path: __dirname + '/public/js',
    filename: '[name].js',
    library: '[name]'
  },
  watch: true,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  //devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: "babel-loader",
        options: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },/*
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
  ],*/
  devServer: {
    contentBase: [
      path.join(__dirname, "bower_components/"),
      path.join(__dirname, "public/")
    ],
    watchContentBase: true,
    hot: true,
    watchOptions: {
      poll: true
    },
    compress: true,
    port: 9000
  }
}