var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/scripts');
var APP_DIR = path.resolve(__dirname, 'app');
var NODE_MODULES = path.resolve(__dirname, 'node_modules');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
      loaders : [
        {
          test : /\.js?/,
          exclude: NODE_MODULES,
          include : APP_DIR,
          loader : 'babel-loader',
          query: {
            presets: ['es2015','react','stage-2']
          }
        }
      ]
    }
};

module.exports = config;