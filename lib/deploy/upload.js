const request = require('request-promise');
const fs = require('fs');
const chalk = require('chalk');

const upload = async (host, appName, pkgPath) => {
    try {
        const option = {
            url: `${host}/rest/feda/v1/apps/${appName}`,
            formData: {
                package: fs.createReadStream(pkgPath)
            }
        };
        const {success, message} = JSON.parse(await request.post(option));
        if (success) {
            console.log(chalk.green(`${appName} has been deployed successfully`));
        } else {
            console.log(chalk.red(message));
        }
    } catch (error) {
        console.error(chalk.red(error));
    }
};

module.exports = upload;

