const config = {
    name: '',
    proxy: {},
    agent: 'http://127.0.0.1'
};

module.exports = ({name, version}) => {
    config.name = version ? `${name}@${version}` : name;
    return JSON.stringify(config, null, 4);
};
