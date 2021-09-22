/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const path = require( 'path' );
const nodeExternals = require('webpack-node-externals');

module.exports = {

    // bundling mode
    mode: 'production',

    target: "node",

    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    externals: [{ processEnv: 'process.env' }, nodeExternals()],

    // entry files
    entry: './src/server.ts',

    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'server.js',
    },

    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ],
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};