const concat = require('concat');

(async function build() {
  const files = [
    './dist/AngElemMegaMenuAndFooter/runtime.js',
    './dist/AngElemMegaMenuAndFooter/polyfills.js',
    './dist/AngElemMegaMenuAndFooter/scripts.js',
    //'./dist/AngElemMegaMenuAndFooter/styles.js',
    './dist/AngElemMegaMenuAndFooter/main.js'
  ];
  await concat(files, './dist/AngElemMegaMenuAndFooter/bundle.js');
})();
