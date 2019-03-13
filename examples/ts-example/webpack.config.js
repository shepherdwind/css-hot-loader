const webpack = require('webpack'); // webpack itself
const path = require('path'); // nodejs dependency when dealing with paths
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tslintConfig = require('./tslint.json');
const AutoPrefixer = require('autoprefixer');


let config = { // config object
  mode: 'development',
  entry: {
    output: './src/App.ts', // entry file
  },
  output: { // output
    path: path.resolve(__dirname, 'dist'), // ouput path
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test : /\.ts$/,
        exclude : /(node_modules|Gulptasks)/,
        enforce : 'pre',
        use : [
          {
            loader : 'ts-loader',
            options : {
              transpileOnly : true
            }
          },
          {
            loader : `tslint-loader`,
            options : tslintConfig
          }
        ]
      },
      {
        test : /\.(css|sass|scss)$/,
        exclude : /node_modules/,
        use : [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader : 'css-loader',
            options : {
              constLoaders : 1,
              minimize : true
            }
          },
          {
            loader : 'clean-css-loader',
            options : {
              compatibility : 'ie8',
              debug : true,
              level : {
                2 : {
                  all : true
                }
              }
            }
          },
          {
            loader : 'postcss-loader',
            options : {
              plugins : loader => [
                AutoPrefixer({
                  browsers : ['last 2 versions'],
                  cascade : false
                })
              ]
            }
          },
          {
            loader : 'fast-sass-loader',
            options : {
              includePaths : [
                'node_modules',
                'src',
              ]
            }
          }
        ]
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
