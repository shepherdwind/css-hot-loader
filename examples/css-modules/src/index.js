require('./global.css');
require('./css-modules-test');

// Entry file requires the below to avoid full page refreshes
if (module.hot) {
  module.hot.accept();
}
