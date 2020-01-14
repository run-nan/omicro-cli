#! /usr/bin/env node
const program = require('commander');
const hint = require('../lib/utils/hint');
const yellow = require('../lib/utils/yellow');
const init = require('../lib/init');

program.version('1.0.0', '-v, --version');

program
    .command('init')
    .description(yellow('init a front-end micro service project of typeScript'))
    .action(() => {
        init();
    });

program
    .command('list')
    .option('-a, --agent', 'the ip of front end deploy agent')
    .description(yellow('list all the deployed micro service'))
    .on('--help', () => {
        hint([
            'the default server ip is 127.0.0.1'
        ]);
    })
    .action((option) => {
        console.log(option);
    });

program
    .command('deploy <name>')
    .option('-c, --config', 'the path of omicro.config.js')
    .option('-a, --agent', 'the ip of front end deploy agent')
    .description(yellow('deploy the micro service by front end deploy agent'))
    .on('--help', () => {
        hint([
            'the default name is the name you configured by omicro init',
            'the default config path is ./omicro.config.js',
            'the default deploy agent ip is 127.0.0.1'
        ]);
    })
    .action(() => {

    });

program
    .command('undeploy <name>')
    .option('-a, --agent', 'the ip of front end deploy agent')
    .description(yellow('undeploy the micro service by front end deploy agent'))
    .on('--help', () => {
        hint([
            'the default name is the name you configured by omicro init',
            'the default deploy agent ip is 127.0.0.1'
        ]);
    })
    .action(() => {

    });

program.parse(process.argv);
