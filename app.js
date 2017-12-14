require('./gulpfile.js');
const gulp = require('gulp');
const fs = require('fs');
gulp.start('css');
gulp.start('css:watch');

const views = require('koa-views');
const path = require('path');
const Koa = require('koa');
const app = new Koa();
 
app.use(require('koa-static')('./dist', null));

// 加载模板引擎
app.use(views(path.join(__dirname, './test'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = 'hello koa2'
  await ctx.render('index', {
    title,
  });
});
 
app.listen(3000);
