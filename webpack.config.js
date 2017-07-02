const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
//const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const prod = process.env.NODE_ENV === 'prod'

const webpackConfig = {
  context: __dirname,
  entry: {
    task: './source/task',
  },
  output: {
    path: path.join(__dirname, '/public/js'),
    filename: '[name].js',
    library: '[name]',
  },
  watch: true,
  resolve: {
    moduleExtensions: ['.', './node_modules'],
    extensions: ['.js', '.jsx'],
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['stage-2', 'stage-0', 'es2015', 'react'],
          plugins: ['transform-class-properties'],
        },
      },
    ],
  },
  devServer: {
    contentBase: [
      path.join(__dirname, 'bower_components/'),
      path.join(__dirname, 'public/'),
    ],
    publicPath: '/js/',
    watchContentBase: true,
    compress: true,
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/index.html' },
      ],
    },
    port: 9000,
  },
}

if (prod) {
  delete webpackConfig.devServer
  delete webpackConfig.devtool
  webpackConfig.watch = false
  webpackConfig.plugins = [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ]
}

module.exports = webpackConfig
