var page = require('webpage').create();

page.viewportSize = { width: 1200, height: 800 };

page.open('http://www.breitbart.com/', function() {
  page.clipRect = { top: 0, left: 0, width: 1200, height: 1000 };
  page.render('breitbart1.png');
  page.clipRect = { top: 1000, left: 0, width: 1200, height: 1000 };
  page.render('breitbart2.png');

  console.log('loaded and screenshotted breitbart.com');
  phantom.exit();
});
