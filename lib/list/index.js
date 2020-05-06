const request = require('request-promise');
const chalk = require('chalk');
const showTable = require('./show-table');

const list = async (option) => {
    const host = option.agent;
    const {success, data} = JSON.parse(await request({url: `${host}/rest/feda/v1/apps`}));
    if (success) {
        showTable(data);
    } else {
        console.error(chalk.red('Failed to get all the apps\' info'));
    }
};

module.exports = list;
