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
var fs = require('fs')
spinner.start()

const projectName = process.env.ENV_PROJECT || 'tip';

function copyLibToTip () {
  const staticPath = p => path.join(__dirname, '../../dist/static', p)
  const tipPath = p => path.join(__dirname, '../../../' + projectName, p)
  const sourceList = {
    [staticPath('css/lib.css')]: 'src/styles/index.css',
    [staticPath('js/lib.js')]: 'src/common/lib.js',
    [path.join(__dirname, '../dll/*')]: (projectName === 'tip' ? 'conf/dll/' : 'config/dll/')
  }
  Object.keys(sourceList).forEach(from => {
    const to = tipPath(sourceList[from])
    const isDir = to.lastIndexOf('/') === to.length - 1
    rm(to, err => {
      if (err) throw err
      if (isDir) {
        shelljs.mkdir(to)
        shelljs.cp('-r', from, to)
      } else {
        shelljs.cp(from, to)
      }
      console.log(chalk.cyan(`copy ${from} to ${to}.\n`))
    })
  })
}
// assetsRoot: path.resolve(__dirname, '../dist'), assetsSubDirectory static
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
    // fs.writeFileSync('./stats.json', stats, 'utf8')
    copyLibToTip()

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
