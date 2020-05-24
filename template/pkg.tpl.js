const template = {
    name: '',
    version: '',
    scripts: {
        start: 'webpack-dev-server',
        build: 'webpack --env.production && node ./script/fill-omicro-info.js',
        test: 'jest'
    },
    devDependencies: {
    },
    dependencies: {
    },
    browserslist: {
        production: [
            '>0.2%',
            'not dead',
            'not op_mini all'
        ],
        development: [
            'last 1 chrome version',
            'last 1 firefox version',
            'last 1 safari version',
            'last 1 ie version'
        ]
    }
};

module.exports = ({name, version}) => {
    template.name = name;
    template.version = version;
    return JSON.stringify(template, null, 4);
};
