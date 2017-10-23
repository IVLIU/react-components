require('./gulpfile.js');
const gulp = require('gulp');
const fs = require('fs');
gulp.start('css');
gulp.start('css:watch');

const Koa = require('koa');
const app = new Koa();
 
app.use(require('koa-static')('./dist', null));

// response 
app.use(ctx => {
  ctx.type = 'text/html';
  ctx.body = fs.createReadStream('./views/index.html');
});
 
app.listen(3000);
