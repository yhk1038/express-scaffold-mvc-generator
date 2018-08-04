#!/usr/bin/env node
var cmd = require('node-cmd');
var commander = require('commander');

commander
    .arguments('<resource>')
    .option('-o, --only <scaffold_element>', 'Generate only one of (Controller | Model | Views).')
    .action(function(resource){
        let core_dependencies = [
            'express-scaffold-mvc-base' // core base classes of Model, Controller, View
        ];
        let dependencies = [
            'ejs', 'express-ejs-layouts' // default template engine ~> ejs
        ];

        for(var i in core_dependencies) {
            var pkg = core_dependencies[i];
            dependencies.push(pkg);
        }

        if (resource === 'install' || resource == 'I') {
            cmd.run(`npm i -S ${dependencies.join(' ')}`);
        }
        else if (resource === 'update' || resource == 'U') {
            cmd.run(`npm i express-scaffold-mvc-generator -g -S && npm i -S ${core_dependencies.join(' ')}`);
        }
        
        else {
            require('../scaffold')(resource);
        }
    })
    .parse(process.argv);
