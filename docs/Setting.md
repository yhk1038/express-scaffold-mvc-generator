# Setting

## First. Create router file (don't remove this comments!):
  ```javascript
  /// routes/routes.js

  // DO NOT DELETE COMMENTS!!
  var express = require('express');
  var router = express.Router();

  // Require controller modules

  module.exports = router
  ```

## Second. In your app.js

- Configure 'ejs' for Template Engine.
  ```javascript
  /// app.js
  
  // app.set('view engine', 'jade'); // initiated by express
  const expressLayouts = require('express-ejs-layouts');
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.set('layout', 'layout');
  app.set("layout extractScripts", true);
  app.use(expressLayouts);
  ```
  Additionally, In your 'views' folder, replace '**.jade**' files with their contents with '**.ejs**' files.

  In particular, 'layout.jade' must be replaced with 'layout.ejs'. Because `app.set('layout', 'layout');` define default layout using for 'layout.ejs'.

- Connect Router.
  ```javascript
  /// app.js
  
  // var indexRouter = require('./routes/index'); // initiated by express
  // var usersRouter = require('./routes/users'); // initiated by express
  var router = require('./routes/routes');

  ...

  // app.use('/', indexRouter); // initiated by express
  // app.use('/users', usersRouter); // initiated by express
  app.use('/', router);
  ```

All done! Enjoy Scaffold :)
  