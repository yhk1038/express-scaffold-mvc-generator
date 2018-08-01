#!/usr/bin/env node
var cmd = require('node-cmd');
var commander = require('commander');

commander
    .arguments('<resource>')
    .option('-o, --only <scaffold_element>', 'Generate only one of (Controller | Model | Views).')
    .action(function(resource){
        if (resource === 'install') {
            cmd.run('npm install express-scaffold-mvc-base --save');
        } else {
            require('../scaffold')(resource);
        }
    })
    .parse(process.argv);
