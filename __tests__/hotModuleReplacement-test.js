'use strict';
jest.useFakeTimers();

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
  jest.runAllTimers();

  expect(spy).toHaveBeenCalled();

  expect(document.querySelectorAll('link').length === 3).toBe(true);
  cb();

  expect(document.querySelectorAll('link').length === 2).toBe(true);
  expect(document.querySelectorAll('link')[0].href.indexOf('?') > -1).toBe(true);

  spy.mockReset();
  spy.mockRestore();
});

test('reload mult style', () => {
  document.body.innerHTML = `
  <head>
    <link href="a.css">
    <link href="b.css">
    <link rel=icon type=image/png href=/img/favicon/favicon_32.png sizes=32x32>
    <script src="c.js"></script>
  </head>
  `;
  const reload = require('../hotModuleReplacement')(2, { fileMap: 'output/{fileName}', });
  const spy = jest.spyOn(EventTarget.prototype, 'addEventListener');
  const cb = [];
  spy.mockImplementation((event, _cb) => {
    cb.push(_cb);
  });
  reload();
  jest.runAllTimers();
  expect(spy).toHaveBeenCalled();

  expect(document.querySelectorAll('link').length === 5).toBeTruthy();
  cb.forEach(fn => fn());

  expect(document.querySelectorAll('link').length === 3).toBeTruthy();
  expect(document.querySelectorAll('link')[0].href.indexOf('?') > -1).toBe(true);
  expect(document.querySelectorAll('link')[1].href.indexOf('?') > -1).toBe(true);
  expect(document.querySelectorAll('link')[2].href.indexOf('?') === -1).toBe(true);

  spy.mockReset();
  spy.mockRestore();

});

test('reload multiple time', () => {
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
  jest.runAllTimers();
  reload();
  jest.runAllTimers();
  reload();
  expect(spy).toHaveBeenCalled();

  expect(document.querySelectorAll('link').length === 3).toBeTruthy();
  cb();

  spy.mockReset();
  spy.mockRestore();
});
