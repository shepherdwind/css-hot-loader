const loaderUtils = require('loader-utils');
const slash = require('slash');
const defaultOptions = {
  fileMap: '{fileName}',
};
module.exports = function(content) {
  this.cacheable();
  const options = Object.assign(
    {},
    defaultOptions,
    loaderUtils.getOptions(this)
  );

  return content + `
    if(module.hot) {
      // ${Date.now()}
      const cssReload = require('${slash(require.resolve('./hotModuleReplacement'))}')(${JSON.stringify(options)});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  `;
};
