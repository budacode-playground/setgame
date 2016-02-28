var webpack = require('webpack');
var path = require('path');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var metadata = {
  title: 'Angular 2 Material Design Lite Seed',
  baseUrl: '/',
  host: 'localhost',
  port: 8080,
  ENV: ENV
};

module.exports = {
  devServer: {
    port: metadata.port,
    host: metadata.host,
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },
  metadata: metadata,
  devtool: 'source-map',
  debug: true,
  entry: {
    'app': './src/app.ts',
    'vendor': './src/vendor.ts'
  },
  output: {
    path: "./dist",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ],

  resolve: {
    extensions: ['', '.ts', '.js', '.css', '.scss', '.jade']
  },

  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      //{ test: /\.scss$/, loader: 'file-loader!raw-loader!sass-loader' },
      //{ test: /\.scss$/, loader: 'raw-loader!sass-loader' },
      { test: /\.jade$/, loader: 'jade-loader' }
    ],
    noParse: [path.join(__dirname, 'node_modules', 'angular2', 'bundles')]
  },
};
