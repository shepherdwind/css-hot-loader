const webpack = require('webpack'); // webpack itself
const path = require('path'); // nodejs dependency when dealing with paths
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = { // config object
  entry: {
    output: './src/index.js', // entry file
    bar: './src/bar.js', // entry file
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
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
  },
  devtool: 'eval-source-map', // enable devtool for better debugging experience
}

module.exports = config;
