var normalizeUrl = require('normalize-url');

var getCurrentScriptUrl = function() {
  var src;
  if (document) {
    if (document.currentScript) {
      src = document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName('script');
      src = scripts[scripts.length - 1].src;
    }
  }

  return function(fileMap) {
    var splitResult = /([^\\/]+)\.js$/.exec(src);
    var filename = splitResult && splitResult[1];
    if (!filename) {
      return [src.replace('.js', '.css')];
    }
    return fileMap.split(',').map(function(mapRule) {
      var reg = new RegExp(filename + '\\.js$', 'g')
      return normalizeUrl(src.replace(reg, mapRule.replace(/{fileName}/g, filename) + '.css'));
    });
  };
}

var getScriptSrc = getCurrentScriptUrl();

function reloadStyle(src) {
  var elements = document.querySelectorAll('link');
  var loaded = false;
  for (var i = 0, el = null; el = elements[i]; i++) {
    var url = getReloadUrl(el.href, src);
    if (url) {
      el.href = url + '?' + Date.now();
      loaded = true;
    }
  }
  return loaded;
}

function getReloadUrl(href, src) {
  href = normalizeUrl(href);
  var ret;
  src.some(function(url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}

function reloadAll() {
  var elements = document.querySelectorAll('link');
  for (var i = 0, el = null; el = elements[i]; i++) {
    var src = el.href.split('?')[0];
    el.href = src + '?' + Date.now();
  }
}

module.exports = function(options) {
  return function() {
    if (typeof document === 'undefined') {
      return;
    }

    var src = getScriptSrc(options.fileMap);
    var reloaded = reloadStyle(src);
    if (reloaded) {
      console.log('[HMR] css reload %s', src.join(' '));
    } else {
      console.log('[HMR] css reload all css');
      reloadAll();
    }
  }
};
