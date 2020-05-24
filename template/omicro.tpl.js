const config = {
    name: '',
    assets: {
        css: [],
        js: []
    }
};

module.exports = ({name, version}) => {
    config.name = version ? `${name}@${version}` : name;
    return JSON.stringify(config, null, 4);
};
