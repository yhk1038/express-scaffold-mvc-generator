# Express Scaffold MVC Generator

## Install

```
npm install express-scaffold-mvc-generator -g --save
```

Note the `-g` and `--save` options. You can use cli interface when it was global installed only.

## To use

```
# => express:scaffold [options] <resource>

$ express:scaffold posts

invoke          routes/routes.js
invoke          controllers/posts.js
invoke          models/posts.js
invoke          views/posts/index.ejs
invoke          views/posts/new.ejs
invoke          views/posts/show.ejs
invoke          views/posts/edit.ejs
invoke          views/posts/_form.ejs
invoke          views/posts/components/item.ejs

```

## Trouble ..
- If you do not recognize `routes/routes.js`, you will need to run the script twice to create it normally.
  - And in this case, add the following code above and below.
  ```javascript
  // DO NOT DELETE COMMENTS!!
  var express = require('express');
  var router = express.Router();
  
  // Require controller modules
  ...inserted code here...
  
  module.exports = router
  ```

## Help

```
$ express:scaffold -h
```

## Contribute
Contribute and Pull-Request and Proposal is always welcome.

## Contact
You can always contact me on [Email yhkks1038@gmailcom](mailto://yhkks1038@gmailcom) or Create Issue on this Repository.


## MIT
The MIT License (MIT)

Copyright (c) 2018 Yonghyun Kim (freddy-kim in npm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
