const webpack = require('webpack'); // webpack itself
const path = require('path'); // nodejs dependency when dealing with paths
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // require webpack plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = { // config object
  entry: {
    output: ['./src/index.js'], // entry file
  },
  output: { // output
    path: path.resolve(__dirname, 'dist'), // ouput path
    filename: '[name].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ] // end rules
  },
  plugins: [ // webpack plugins
    new MiniCssExtractPlugin('[name].css'),
  ],
  devtool: 'source-map',
  serve: {},
}

module.exports = config;
