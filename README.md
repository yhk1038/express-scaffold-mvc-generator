# Express Scaffold MVC Generator

## Install
```bash
$ npm install express-scaffold-mvc-generator -g --save && npm link

$ express prj
$ cd prj
$ npm install

$ express:scaffold install
```

## Checkout the details

- [Installation](https://github.com/yhk1038/express-scaffold-mvc-generator/blob/master/docs/Installation.md)
- [Initial Setting](https://github.com/yhk1038/express-scaffold-mvc-generator/blob/docs/Setting.md)

## To use

```
$ express:scaffold <actions> <resource...> [options]
```

For example:
```
$ express:scaffold g|generate posts

invoke          routes/routes.js
create          controllers/posts.js
create          models/posts.js
create          views/posts/index.ejs
create          views/posts/new.ejs
create          views/posts/show.ejs
create          views/posts/edit.ejs
create          views/posts/_form.ejs
create          views/posts/components/item.ejs

```

### It generates Router & M & V & C about resource
e.g. `$ express:scaffold g posts`

**[Router] routes/routes.js**
```javascript
const posts_controller = require('../controllers/posts');

router.get('/posts.:format?', posts_controller.index);
router.get('/posts/new.:format?', posts_controller.new);
router.get('/posts/:id.:format?', posts_controller.show);
router.post('/posts.:format?', posts_controller.create);
router.get('/posts/:id/edit.:format?', posts_controller.edit);
router.post('/posts/:id.:format?', posts_controller.update);
router.post('/posts/:id/delete.:format?', posts_controller.delete);
```

**[Model] models/posts.js**
```javascript
let Model = require('../core/model');

class posts extends Model {
  constructor(){
    super()
  }
}

module.exports = [ Model, posts ]
```

**[Controller] controllers/posts.js**
```javascript
let [Controller, render, __] = require('../core/controller');
let [Model, posts] = require('../models/posts');


class PostsController extends Controller {
  constructor() { super(__filename) }

  // GET /posts.html
  // GET /posts.json
  index(req, res) {
    // 다음과 같이 double underscore 를 사용해,
    // 변수를 view 로 전송할 수 있습니다. (변수를 랜더링 스코프에서 유지시킵니다.)
    __.title = __.klass.controllers_name;

    // 다음과 같이 __.klass 를 통해 멤버 함수를 호출할 수 있습니다.
    // (__.klass 는 이 class 에서 할당된 this 를 가리키도록 되어있습니다.)
    // __.params = __.klass.posts_params(req);

    render(`${__.klass.resource_name}/index`, req, res, __)
  }

  // GET /posts/new.html
  new(req, res) {
    render(`${__.klass.resource_name}/new`, req, res, __)
  }

  // GET /posts/1.html
  // GET /posts/1.json
  show(req, res) {
    render(`${__.klass.resource_name}/show`, req, res, __)
  }

  // POST /posts.html
  // POST /posts.json
  create(req, res) {
    // render(`${__.klass.resource_name}/show`, req, res, __)
  }

  // GET /posts/1/edit.html
  edit(req, res) {
    render(`${__.klass.resource_name}/edit`, req, res, __)
  }

  // POST /posts/1.html
  // POST /posts/1.json
  update(req, res) {
    // render(`${__.klass.resource_name}/edit`, req, res, __)
  }

  // POST /posts/1/delete.html
  // POST /posts/1/delete.json
  delete(req, res) {
    // render(`${__.klass.resource_name}/edit`, req, res, __)
  }


  // @private
  posts_params(req) {
    return req.params
  }
}

let controller = new PostsController();
module.exports = controller.exports(__);
```

**[View] views/posts/** : empty contents ejs filetree
- views/posts/
  - components/
    - item.ejs
  - _form.ejs
  - edit.ejs
  - index.ejs
  - new.ejs
  - show.ejs


## The parent classes
is already given to your project!

Check inside of your `core/` directory.

**CAUTION**

If the `core/` directory exists already, the generator will not work for making a new core directory.


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
Contribute and Pull-Request and Proposal are always welcome.

## Contact
You can always contact me on [Email yhkks1038@gmail.com](mailto://yhkks1038@gmail.com) or Create Issue on this Repository.


## MIT
The MIT License (MIT)

Copyright (c) 2018 Yonghyun Kim (freddy-kim in npm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
