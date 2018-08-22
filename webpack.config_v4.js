const os = require('os');
const fs = require('fs-extra');
const path = require('path');
const { URL } = require('url');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const buildLanguage = require('./build/languages.js');
const buildCKEditor = require('./build/ckeditor.js');

const isProd = process.env.NODE_ENV === 'production';

const MOUNT_BASE = '/center/';

const getConfig = (env = {}) => ({
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? '#source-map' : '#cheap-module-source-map',
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: MOUNT_BASE,
    filename: '[name].[hash].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]|\.css$/,
          name: 'vendor',
          chunks: 'all',
        },
        stylesInVue: {
          test(module) {
            return module.nameForCondition
              && /\.vue$/.test(module.nameForCondition())
              && !/^javascript/.test(module.type);
          },
          name: 'style',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    host: []
      .concat(...Object.values(os.networkInterfaces()))
      .map(x => x.address)
      .find(addr => /^10\./.test(addr)) || 'localhost',
    openPage: MOUNT_BASE.slice(1),
    contentBase: path.join(__dirname, './dist'),
    proxy: {
      [`${MOUNT_BASE}api`]: {
        target: env.api,
        onProxyReq(proxyReq, req) {
          const { host } = new URL(env.api);
          const referer = new URL(req.headers.referer);
          referer.host = host;
          proxyReq.setHeader('Host', host);
          proxyReq.setHeader('Referer', referer.href);
        },
      },
      [`${MOUNT_BASE}casLogin`]: env.api,
      [`${MOUNT_BASE}redirect`]: env.api,
      '/clusterMgr': env.api,
    },
    before(app) {
      app.get(`${MOUNT_BASE}languages/*`, (req, res) => {
        const file = path.resolve(__dirname, './dist/languages', req.params[0]);
        res.end(fs.readFileSync(file));
      });
      app.get(`${MOUNT_BASE}assets/*`, (req, res) => {
        const file = path.resolve(__dirname, './dist/assets', req.params[0]);
        if (/\.css$/.test(file)) {
          res.set('Content-Type', 'text/css');
        }
        res.end(fs.readFileSync(file));
      });
    },
    historyApiFallback: {
      index: MOUNT_BASE,
      rewrites: [],
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules(?!([\\/]hui[\\/]src))/,
      },
      {
        test: /\.(png|jpg|gif|svg|eot|svg|ttf|otf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new class WatchCustomFilePlugin {
      constructor({ files, after }) {
        this.files = files;
        this.after = after;
      }

      apply(compiler) {
        compiler.hooks.afterCompile.tap('WatchCustomFilePlugin', (compilation) => {
          this.files.forEach((file) => {
            const dep = fs.statSync(file).isFile()
              ? 'fileDependencies'
              : 'contextDependencies';
            compilation[dep].add(file);
          });
          this.after();
        });
      }
    }({
      files: [path.resolve(__dirname, './languages')],
      after() {
        buildLanguage();
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.MOUNT_BASE': JSON.stringify(MOUNT_BASE),
      'process.env.ROUTE_BASE': JSON.stringify(MOUNT_BASE),
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'assets/favicon.ico',
      filename: 'index.html',
      chunksSortMode(a, b) {
        if (a.names[0] === 'vendor') return -1;
        if (b.names[0] === 'vendor') return 1;
        return 0;
      },
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[name].[contenthash].css',
    }),
  ],
});

module.exports = (env = {}) => {
  buildLanguage();
  buildCKEditor();

  return getConfig(env);
};
