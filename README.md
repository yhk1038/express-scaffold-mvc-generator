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

## Help

```
$ express:scaffold -h
```

## Under MIT
