var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const atImport = require('postcss-import');
const cssnext = require('postcss-cssnext');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const cssLoaders = [
  {
    loader: 'css-loader',
    options: { importLoaders: 1, minimize: true },
  }
];

module.exports = {
  entry: {
    app: './src/app.js'
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|svg|ttf|otf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              publicPath: './common/image',
              outputPath: './common/image',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          ...cssLoaders,
        ]
      },
      {
        test: /\.style$/,
        use: ['vue-style-loader', 'css-loader', 'style-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    })
  ]
}
