'use strict';

test('basic reload', () => {
  document.body.innerHTML = `
  <head>
    <link href="a.css">
    <link href="b.css">
    <script src="a.js"></script>
  </head>
  `;
  const reload = require('../hotModuleReplacement')(1, {
    fileMap: '{fileName}',
  });
  const spy = jest.spyOn(EventTarget.prototype, 'addEventListener');
  let cb;
  spy.mockImplementation((event, _cb) => {
    cb = _cb;
  });
  reload();
  expect(spy).toHaveBeenCalled();

  expect(document.querySelectorAll('link').length === 3);
  cb();

  expect(document.querySelectorAll('link').length === 2);
  expect(document.querySelector('link').href.indexOf('?') > -1);

  spy.mockReset();
  spy.mockRestore();
});

