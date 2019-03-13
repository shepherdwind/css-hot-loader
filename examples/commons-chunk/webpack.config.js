const webpack = require('webpack'); // webpack itself
const path = require('path'); // nodejs dependency when dealing with paths
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = { // config object
  mode: 'development',
  entry: {
    a: './src/index.js', // entry file
    b: './src/b.js',
  },
  output: { // output
    path: path.resolve(__dirname, '.'), // ouput path
    filename: 'dist/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: 'css-hot-loader',
            options: {
              fileMap: '../css/{fileName}',
              reloadAll: true,
            },
          },
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ] // end rules
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: "common",
          chunks: "all",
          minChunks: 2,
          minSize: 0,
        },
      }
    }
  },

  plugins: [ // webpack plugins
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: "css/[id].css",
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '.'),
    hot: true // Enable webpack's Hot Module Replacement feature
  },
}

module.exports = config;
