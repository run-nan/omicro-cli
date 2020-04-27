const path = require('path');
const pack = require('./pack');
const upload = require('./upload');

const deploy = (option) => {
    const configFilePath = path.resolve(option.config);
    const host = option.agent;
    pack(configFilePath, upload.bind(null, host));
};

module.exports = deploy;
