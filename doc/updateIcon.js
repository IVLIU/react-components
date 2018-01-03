const shell = require('shelljs')
const path = require('path')
const resolve = p => path.resolve(__dirname, p)

const from = resolve('../../tip/src/images/svg')
const target = resolve('../src/images/')
shell.cp('-R', from, target)
