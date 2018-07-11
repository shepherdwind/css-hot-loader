const webpack = require('webpack'); // webpack itself
const path = require('path'); // nodejs dependency when dealing with paths
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // require webpack plugin

let config = { // config object
  entry: {
    index2: './src/index2.js',
    index1: './src/index.js', // entry file
  },
  output: { // output
    path: path.resolve(__dirname, '.'), // ouput path
    filename: 'dist/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [{
          loader: 'css-hot-loader',
          options: {
            fileMap: '../css/{fileName}',
            reloadAll: true,
          },
        }].concat(ExtractTextWebpackPlugin.extract({  // HMR for styles
          fallback: 'style-loader',
          use: ['css-loader'],
        })),
      },
    ] // end rules
  },
  plugins: [ // webpack plugins
    new ExtractTextWebpackPlugin('css/[name].css'),
    new webpack.optimize.CommonsChunkPlugin({ name: 'common' }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, '.'),
    inline: true,
    compress: true, // Enable gzip compression for everything served:
    hot: true // Enable webpack's Hot Module Replacement feature
  },
  devtool: 'eval-source-map', // enable devtool for better debugging experience
}

module.exports = config;
