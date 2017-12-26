var glob = require('glob')
var fs = require('fs')
var result = glob.sync('./svg/*.svg')
var t = result.map((item) => {
  console.log(item)
}).join('')
