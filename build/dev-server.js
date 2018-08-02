
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('../webpack.config')
var nodeApi = require('../nodeApi/index')
var bodyParser = require('body-parser');
// default port where dev server listens for incoming traffic
var port = process.env.PORT || 9000;
// automatically open browser, if not set will be false
var autoOpenBrowser = true;
// Define HTTP proxies to your custom API backend

var app = express()


var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// serve webpack bundle output
app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)
app.use(hotMiddleware)

app.use('/', nodeApi);

var uri = 'http://localhost:' + port;

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  // if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
  //   opn(uri)
  // }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
