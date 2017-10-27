var glob = require('glob');
var fs = require('fs');
var result = glob.sync('./svg/*.svg');
var t = result.map((item) => {
  var content = fs.readFileSync(item).toString();
  return '<div class="left">' + content + '</div><div class="right">' + item.replace('./svg/', '') + '</div>';
}).join('');
fs.writeFileSync('./test/svg.ejs', t);
