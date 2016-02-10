/* eslint-env node */

var path = require('path');
var webpack = require('webpack');

var isProduction = (process.env.NODE_ENV === 'production');
console.log('Production build: ', isProduction);

var entries = [ path.join(__dirname, 'src', 'index.js') ]
if (!isProduction) entries.push('webpack-hot-middleware/client');

var plugins = [ new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify(process.env.NODE_ENV) } }), new webpack.optimize.OccurenceOrderPlugin() ];
if (!isProduction) plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin());
else plugins.push(new webpack.optimize.UglifyJsPlugin({ compressor: { pure_getters: true, unsafe: true, unsafe_comps: true, screw_ie8: true, warnings: false }}));

var devtool = null;
if (!isProduction) devtool = 'cheap-module-eval-source-map';

var output = {
  path: path.join(__dirname, 'dist'),
  filename: 'bundle.js',
  publicPath: '/static/'
};

var loaders = [{
  test: /\.js$/,
  loader: 'babel',
  include: path.join(__dirname, 'src'),
}];

module.exports = {
  devtool: devtool,
  entry: entries,
  output: output,
  module: {
    loaders: loaders,
    noParse: [ /moment\.js/ ] // don't add all the locales into the bundle (-130kB minified) https://github.com/webpack/webpack/issues/198
  },
  plugins: plugins,
};
