const path = require('path'); // nodejs dependency when dealing with paths
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = { // config object
  entry: {
    output: ['./src/index.js'], // entry file
  },
  output: { // output
    path: path.resolve(__dirname, 'dist'), // output path
    filename: '[name].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        oneOf: [ // We use oneOf so we can use both global stylesheets and CSS Modules
          {
            test: /\.module\.css/,
            use: [
              'css-hot-loader?cssModule=true',
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]__[name]__[hash:base64:5]',
                },
              },
            ],
          },
          {
            test: /\.css/,
            use: [
              'css-hot-loader',
              MiniCssExtractPlugin.loader,
              'css-loader'
            ],
          },
        ],
      },
    ], // end rules
  },
  plugins: [
    // webpack plugins
    new MiniCssExtractPlugin('[name].css'),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
  },
};

module.exports = config;
