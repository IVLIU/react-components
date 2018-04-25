const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const views = require('koa-views')
const config = require('../styleguide.config')

const app = new Koa()

app.use(serve(path.join(__dirname, '../styleguide')))
app.use(views(path.join(__dirname, '../styleguide'), { map: { html: 'ejs' } }))

app.use(async ctx => {
  await ctx.render('index')
})
app.listen(config.serverPort, () => {
  console.log(`sever is listening on port: ${config.serverPort}`)
})
