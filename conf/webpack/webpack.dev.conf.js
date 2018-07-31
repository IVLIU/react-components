var utils = require('./utils')
var webpack = require('webpack')
var config = require('../../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// var env = process.env.NODE_ENV.trim()
var HtmlWebpackPlugin = require('html-webpack-plugin')
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [
    // 'react-hot-loader/patch',
    // './build/dev-client'
  ].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  cache: true,
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/manifest.json')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new AddAssetHtmlPlugin([{
      filepath: utils.getDllPath('../dll'),
      hash: false,
      includeSourcemap: false
    }]),
    new FriendlyErrorsPlugin()
  ]
})
