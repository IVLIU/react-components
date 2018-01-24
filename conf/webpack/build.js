require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../../config')
var webpackConfig = require('./webpack.prod.conf')
var shelljs = require('shelljs')

var spinner = ora('building for production...')
spinner.start()

const target = path.resolve(__dirname, '../../../tip/src/')

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    shelljs.cp(path.resolve(__dirname, '../../dist/static/css/lib.css'), path.join(target, 'styles/index.css'))
    shelljs.cp('-R', path.resolve(__dirname, '../../dist/static/js/lib.js'), path.join(target, 'common/lib.js'))
    shelljs.cp('-R', path.resolve(__dirname, '../dll/'), target)
    shelljs.cp('-R', path.resolve(__dirname, '../dll/'), path.join(target, '../conf/'))
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})