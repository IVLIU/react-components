var utils = require('./utils')
var webpack = require('webpack')
var config = require('../../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  cache: true,
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[id].js'),
    library: 'TipUi',
    libraryTarget: 'umd'
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  },
  optimization: {
    minimizer: [
      // 替代之前的压缩方式
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          warnings: false
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css'),
      allChunks: true
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/manifest.json')
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
