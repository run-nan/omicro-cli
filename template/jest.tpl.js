const config =
`module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};`;

module.exports = () => {
    return config;
};
