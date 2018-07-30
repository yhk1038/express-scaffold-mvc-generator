#!/usr/bin/env node

var commander = require('commander');

commander
    .arguments('<resource>')
    .option('-o, --only <scaffold_element>', 'Generate only one of (Controller | Model | Views).')
    .action(function(resource){
        require('../scaffold')(resource);
    })
    .parse(process.argv);
