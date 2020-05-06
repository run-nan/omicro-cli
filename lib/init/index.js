const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const copyTemplate = require('./copy-template');
const renderConfigFiles = require('./render-config-files');
const installDependencies = require('./install-dependencies');

const init = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What\'s the name of your front-end micro service ?',
            validate: (input) => {
                if (input === '') {
                    console.log(chalk.red('\n! service name can not be empty'));
                    return false;
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'version',
            message: 'What\'s the version of your front-end micro service ?'
        },
        {
            type: 'list',
            name: 'framework',
            message: 'What framework do you want to use ?',
            choices: [
                'react',
                'others'
            ]
        }
    ]).then((answers) => {
        const {name, version} = answers;
        const appName = version ? `${name}@${version}` : name;
        if (!fs.existsSync(path.join(__dirname, appName))) {
            fs.mkdirSync(appName);
        }
        const cwd = path.join(process.cwd(), appName);
        copyTemplate(answers, cwd);
        renderConfigFiles(answers, cwd);
        installDependencies(answers, cwd);
        console.log(chalk.blue(' -----------------------------------------'));
        console.log(chalk.blue('|  start your front-end micro service now |'));
        console.log(chalk.blue(' -----------------------------------------'));
    });
};

module.exports = init;
