const styles = require('./css-modules-test.module.css');
console.log('styles', styles);

const rootElem = document.getElementById('css-modules-root');
const elem = document.createElement('div');
elem.classList.add(styles.foo);
elem.innerText = "I'm styled using CSS Modules!";
rootElem.innerHTML = '';
rootElem.appendChild(elem);
