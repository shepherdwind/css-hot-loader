var getCurrentScriptUrl = function() {
  var src;
  if (document && document.currentScript) {
    src = document.currentScript.src;
  }
  return () => {
    return src.replace('.js', '.css');
  };
}

var getScriptSrc = getCurrentScriptUrl();

function getLinkElement() {
  var element;
  var src = getScriptSrc();
  document.querySelectorAll('link').forEach(el => {
    if (el.href.indexOf(src) > -1) {
      element = el;
    }
  });
  return element;
}

function reloadAll() {
  document.querySelectorAll('link').forEach(el => {
    const src = el.href.split('?')[0];
    el.href = src + '?' + Date.now();
  });
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
