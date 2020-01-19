module.exports = ({name, framework}) => {
    const isReactService = framework === 'react';
    /* eslint-disable */
    return (
`const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_MODULES_PATH = path.resolve(__dirname, './node_modules');

module.exports = (env = {}, argv) => {
    const isEnvProduction = env.production || false;
    const hash = isEnvProduction ? '[contentHash:8]' : '[hash:8]';

    const plugins = [];

    const entry = {
        'bundle': path.resolve(__dirname, './src/index.${isReactService ? 'tsx' : 'ts'}')
    };

    if (isEnvProduction) {
        const cssPlugin = new MiniCssExtractPlugin({
            filename: 'css/[name]' + hash + '.css',
            chunkFilename: 'css/[name]Chunk.[id].css'
        });
        plugins.push(cssPlugin);
    } else {
        entry.mock = path.resolve( __dirname, './mock/platform.ts');
        const htmlPlugin = new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './mock/index.html'),
            chunks: ['mock']
        });
        plugins.push(htmlPlugin);
    }

    return {
        mode: isEnvProduction? 'production' : 'development',
        entry,
        output: {
            path: path.resolve( __dirname, './release'),
            filename: 'js/[name].' + hash + '.js',
            publicPath: '/${name}/'
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: NODE_MODULES_PATH,
                    use: ['awesome-typescript-loader', 'eslint-loader']
                },
                {
                    test: /\.(css|less)$/,
                    use: [
                        isEnvProduction ? {loader: MiniCssExtractPlugin.loader} : 'style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[hash:8].[ext]'
                        }
                    }]
                }
            ]
        },
        plugins,
        devServer: {
            hot: true,
            inline: true,
            quiet: true,
            open: true,
            openPage: '${name}/'
        }
    };
};
`
    );
};

