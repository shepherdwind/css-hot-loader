require('./common.css');
const path = require('path');

exports.hello = function() {
  console.log('hello world common', path.join('a', 'b'));
}
