module.exports = function(content) {
  this.cacheable();
  return content + `
    if(module.hot) {
      // ${Date.now()}
      const cssReload = require('${require.resolve('./hotModuleReplacement')}');
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  `;
};
