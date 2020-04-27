const request = require('request-promise');
const fs = require('fs');
const chalk = require('chalk');

const upload = async (host, appName, pkgPath) => {
    // Todo: 直接关闭对自签名证书的校验不安全
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    try {
        const option = {
            url: `${host}/rest/feda/v1/apps/${appName}`,
            formData: {
                package: fs.createReadStream(pkgPath)
            }
        };
        const {success} = JSON.parse(await request.post(option));
        if (success) {
            console.log(chalk.green(`${appName} has been deployed successfully`));
        } else {
            throw new Error('Failed to deploy to Feda');
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = upload;

