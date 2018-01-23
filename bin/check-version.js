/*
 * 验证是否有更新
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-01-19 15:39:30
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-01-22 11:41:37
 */
const shell = require('shelljs')

const res = shell.exec('git pull', { async: false })
const noUpdate = res.stdout === 'Already up-to-date.\n'

if (noUpdate) {
  return
}
shell.exec('/usr/local/bin/proxychains4 npm install --registry=https://registry.npm.taobao.org')
shell.exec('npm run staging')
