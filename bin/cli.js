#!/usr/bin/env node


var cmd = require('node-cmd');
var program = require('commander');
var pkg = require('../package.json');
require('../helpers/doSynchronousLoop');

// Dependency
let core_dependencies = [
    'express-scaffold-mvc-base' // core base classes of Model, Controller, View
];
let dependencies = [
    'ejs', 'express-ejs-layouts', // default template engine ~> ejs
    'pluralize'
];

core_dependencies.forEach2((pkg, next) => {
    dependencies.push(pkg);
    next()
})

// CLI Meta Set
program
    .version(pkg.version)
    .option('-O, --only <scaffold_element>', 'Generate only one of (Controller | Model | Views).')
    .option('-A, --api', 'Generate for specific api scaffold.');


// Install
program
    .command('install')
    .alias('i')
    .description('install dependencies')
    .action(function() {
        cmd.run(`npm i -g -S pluralize && npm i -S ${dependencies.join(' ')}`);
    });


// Update
program
    .command('update')
    .alias('u')
    .description('update dependencies')
    .action(function() {
        cmd.run(`npm i -g -S express-scaffold-mvc-generator pluralize && npm i -S ${core_dependencies.join(' ')}`);
    });


// Generate
// console.log(options.parent);
program
    .command('generate <resources...>')
    .alias('g')
    .description('run creating resource by scaffolds')
    .action(function(resources, options) {
        resources.forEach2(function(resource, next) {
            require('../generate')(resource, next);
        });
    });

// Delete
// console.log(options.parent);
program
    .command('delete <resource...>')
    .alias('d')
    .description('run deleting scaffolded resource')
    .action(function(resources, options) {
        resources.forEach2(function(resource, next) {
            require('../delete')(resource, next);
        });
    });

program.parse(process.argv);


    // .arguments('<action> <resource>')
    // .option('-o, --only <scaffold_element>', 'Generate only one of (Controller | Model | Views).')
    // .action(function(action, resource){
        // let core_dependencies = [
        //     'express-scaffold-mvc-base' // core base classes of Model, Controller, View
        // ];
        // let dependencies = [
        //     'ejs', 'express-ejs-layouts', // default template engine ~> ejs
        //     'pluralize'
        // ];

        // for(var i in core_dependencies) {
        //     var pkg = core_dependencies[i];
        //     dependencies.push(pkg);
        // }

    //     if (action === 'install' || action == 'I') {
    //         cmd.run(`npm i -g -S pluralize && npm i -S ${dependencies.join(' ')}`);
    //     }
    //     else if (action === 'update' || action == 'U') {
    //         cmd.run(`npm i -g -S express-scaffold-mvc-generator pluralize && npm i -S ${core_dependencies.join(' ')}`);
    //     }
        
    //     else {
    //         // require('../scaffold')(resource);
    //         console.log(action, resource);
    //     }
    // })
    // .on('--help', function(){
    //     console.log(`
    // Examples:

    //     $ express:scaffold generate posts
    
    //     - Delete

    //     $ express:scaffold d posts
    //     $ express:scaffold delete posts

    //     - Install dependencies

    //     $ express:scaffold i
    //     $ express:scaffold install

    //     - NameSpace

    //     $ express:scaffold v1/posts

    //     - Only

    //     $ express:scaffold g posts --only=controller,model
    //     `)
    // })
    // .parse(process.argv);

    /*
    
    express:scaffold g posts
    express:scaffold generate posts
    express:scaffold i 

     */