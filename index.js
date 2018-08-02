
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var nodeApi = require('./nodeApi/index')
var bodyParser = require('body-parser');
var port = process.env.PORT || 8888;

var app = express()


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/', nodeApi);

var uri = 'http://localhost:' + port;

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
