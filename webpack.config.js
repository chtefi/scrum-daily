/* eslint-env node */

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProduction = (process.env.NODE_ENV === 'production');
console.log('Production build:', isProduction);

var entries = [ path.join(__dirname, 'src', 'index.js') ]
if (!isProduction) {
  entries.push('webpack-hot-middleware/client');
}

var plugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html'),
    inject: true,
    hash: false,
    showErrors: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }),
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
  new webpack.optimize.OccurenceOrderPlugin()
];

if (!isProduction) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()    
  );
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ compressor: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true,
      warnings: false
    }}),
    new ExtractTextPlugin("styles.css")
  );
}

var devtool = (isProduction ? null : 'cheap-module-eval-source-map');

var output = {
  path: path.join(__dirname, 'dist'),
  filename: 'bundle.js',
  publicPath: '/static/'
};

var loaders = [{
  test: /\.js$/,
  loader: 'babel',
  include: path.join(__dirname, 'src'),
}, {
  test: /\.css$/,
  // first: postcss does it stuff, then css deals with @import and url(), then style add them to the <head>
  // then, ExtractTextPlugin retrieves all those generated css and store them
  // then, the plugins part comes and specify what's the name of css bundle (could have more than one)
  // we MUST NOT use ExtractTextPlugin in dev (HMR won't work)
  // https://github.com/webpack/extract-text-webpack-plugin/issues/30
  loader: isProduction ? ExtractTextPlugin.extract('style', [ 'css', 'postcss' ]) : 'style!css!postcss',
  include: path.join(__dirname, 'src'),
}];

var nodeModules = {}
 // require('fs').readdirSync('node_modules').forEach(function (module) {
 //   if (module !== '.bin') nodeModules[module] = 'commonjs ' + module
 // });

module.exports = {
  devtool: devtool,
  entry: entries,
  output: output,
  externals: nodeModules,
  module: {
    loaders: loaders,
    noParse: [ /moment\.js/ ] // don't add all the locales into the bundle (-130kB minified) https://github.com/webpack/webpack/issues/198
  },
  plugins: plugins,
  postcss: function () {
      return [
        require('postcss-simple-vars')(),
        require('postcss-focus')(),
        require('autoprefixer')({ browsers: [ 'last 3 versions', 'IE > 9' ] }),
        require('precss')
      ];
  }
};
