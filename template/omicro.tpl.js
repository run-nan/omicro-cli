const config = {
    name: '',
    proxy: {},
    agent: 'http://127.0.0.1'
};

module.exports = ({name}) => {
    config.name = name;
    return JSON.stringify(config, null, 4);
};
