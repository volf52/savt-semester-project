const fs = require('fs');
const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const DotEnv = require('dotenv-webpack');

const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './server/server.ts',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'server.js',
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    target: 'node',
    externals: nodeModules,
    plugins: [
        new DotEnv({
            path: path.join(__dirname, '.env'),
            systemvars: true,
        }),
        new NodemonPlugin(),
    ],
    mode: 'none',
};
