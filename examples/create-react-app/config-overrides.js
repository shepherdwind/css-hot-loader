const isString = maybeString => typeof maybeString === 'string';

const findModuleLoader = (config, {test}) => {
  const loaders = config.module.rules[1].oneOf;
  return loaders.find(loader => {
    return loader.test.toString() == test.toString()
  });
}

const findLoader = (config, {loader: searchedLoader}) => {
  const loaders = config.use;
  return loaders.find(loader => {
    if (isString(loader)) {
      return loader === searchedLoader;
    }
    return loader.loader.toString() == searchedLoader.toString();
  });
}

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  const isDev = env === 'development';

  const stylesModuleLoader = findModuleLoader(config, {test: /\.css$/});
  const cssLoader = findLoader(stylesModuleLoader, {loader: require.resolve('css-loader')});
  cssLoader.options.sourceMap = true;
  // We need `css-hot-loader` for hot reload to work with css modules
  stylesModuleLoader.use.unshift(require.resolve('css-hot-loader'));
  cssLoader.options.modules = true;
  cssLoader.options.localIdentName = '[local]__[name]__[hash:base64:5]';

  const postcssLoader = findLoader(stylesModuleLoader, {loader: require.resolve('postcss-loader')});
  postcssLoader.options.sourceMap = true;

  return config;
}
