module.exports = function(content) {
  this.cacheable();
  return content + `
    if(module.hot) {
      const cssReload = require('${require.resolve('./hotModuleReplacement')}?${Date.now()}');
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  `;
};
