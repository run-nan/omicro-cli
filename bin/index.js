#! /usr/bin/env node
const program = require('commander');
const path = require('path');
const hint = require('../lib/utils/hint');
const yellow = require('../lib/utils/yellow');
const init = require('../lib/init');
const deploy = require('../lib/deploy');

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

const defaultOmicroConfigPath = path.join(process.cwd(), './omicro.config.json');
program
    .command('deploy')
    .option('-c, --config <path>', 'the path of omicro.config.js', defaultOmicroConfigPath)
    .option('-a, --agent <host>', 'the ip of front end deploy agent', 'https://127.0.0.1:3000')
    .description(yellow('deploy the micro service by front end deploy agent'))
    .on('--help', () => {
        hint([
            'the default name is the name you configured by omicro init',
            'the default config path is ./omicro.config.json',
            'the default deploy agent ip is https://127.0.0.1:3000'
        ]);
    })
    .action((option) => {
        deploy(option);
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
