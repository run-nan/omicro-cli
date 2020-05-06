#! /usr/bin/env node
const program = require('commander');
const path = require('path');
const chalk = require('chalk');
const hint = require('../lib/utils/hint');
const init = require('../lib/init');
const deploy = require('../lib/deploy');
const list = require('../lib/list');

// Todo: 直接关闭对自签名证书的校验不安全, 需要想办法让使用者方便配置ca
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

program.version('1.0.0', '-v, --version');

program
    .command('init')
    .description(chalk.yellow('init a front-end micro service project of typeScript'))
    .action(init);

program
    .command('list')
    .option('-a, --agent <host>', 'the host of front end deploy agent', 'https://127.0.0.1:3000')
    .description(chalk.yellow('list all the deployed micro service'))
    .on('--help', () => {
        hint([
            'the default deploy agent is https://127.0.0.1:3000'
        ]);
    })
    .action(list);

const defaultOmicroConfigPath = path.join(process.cwd(), './omicro.config.json');
program
    .command('deploy')
    .option('-c, --config <path>', 'the path of omicro.config.js', defaultOmicroConfigPath)
    .option('-a, --agent <host>', 'the host of front end deploy agent', 'https://127.0.0.1:3000')
    .description(chalk.yellow('deploy the micro service by front end deploy agent'))
    .on('--help', () => {
        hint([
            'the default name is the name you configured by omicro init',
            'the default config path is ./omicro.config.json',
            'the default deploy agent is https://127.0.0.1:3000'
        ]);
    })
    .action(deploy);

program.parse(process.argv);
