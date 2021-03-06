'use strict';

const webpack = require('webpack');
const workboxPlugin = require('workbox-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

function prod() {
  return {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader', // dont't use css-modules
              {
                loader: 'postcss-loader',
                options: require('../configs/postcss.config')()(webpack)
              }
            ]
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[md5:contenthash:hex:10].css',
        allChunks: true
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new workboxPlugin.GenerateSW()
    ],
    optimization: {
      minimizer: [new UglifyJsPlugin()]
    }
  };
}

module.exports = prod;
