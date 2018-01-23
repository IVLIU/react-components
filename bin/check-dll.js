/*
 * 验证dll文件是否被修改，若被修改，则执行npm run dll命令
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-19 15:39:30
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-01-23 19:40:42
 */
const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const oldDllPath = path.resolve(__dirname, '../version/dll.dependencies.js')
const dllPath = path.resolve(__dirname, '../config/lib.dependencies.js')
const targetPath = path.resolve(__dirname, '../conf/dll')

function isDllDependenciesChanged () {
  // 如果dll文件从没被编译过
  if (!fs.existsSync(targetPath)) {
    return true
  }
  if (!fs.existsSync(oldDllPath)) {
    return true
  }
  const dllFile = fs.readFileSync(oldDllPath, 'utf8')
  const newDllFile = fs.readFileSync(dllPath, 'utf8')
  const changed = newDllFile !== dllFile

  return changed
}

const changed = isDllDependenciesChanged()
if (changed) {
  shell.cp(dllPath, oldDllPath)
  shell.exec('npm run dll', { async: false })
}
