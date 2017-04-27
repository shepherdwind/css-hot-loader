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
  return function() {
    return src.replace('.js', '.css');
  };
}

var getScriptSrc = getCurrentScriptUrl();

function getLinkElement() {
  var element;
  var src = getScriptSrc();
  var elements = document.querySelectorAll('link');
  for (var i = 0, el = null; el = elements[i]; i++) {
    if (el.href.indexOf(src) > -1) {
      element = el;
    }
  }
  return element;
}

function reloadAll() {
  var elements = document.querySelectorAll('link');
  for (var i = 0, el = null; el = elements[i]; i++) {
    const src = el.href.split('?')[0];
    el.href = src + '?' + Date.now();
  }
}

module.exports = function() {
  if (typeof document === 'undefined') {
    return;
  }

  var src = getScriptSrc();
  var el = getLinkElement();
  if (el) {
    el.href = src + '?' + Date.now();
    console.log('[HMR] css reload %s', src);
  } else {
    reloadAll();
  }
};
