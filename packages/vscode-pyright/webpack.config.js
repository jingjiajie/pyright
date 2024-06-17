/**
 * webpack.config-cli.js
 * Copyright: Microsoft 2018
 */

const path = require('path');
const { ProvidePlugin, DefinePlugin } = require('webpack');
//const CopyPlugin = require('copy-webpack-plugin');
const { cacheConfig, monorepoResourceNameMapper, tsconfigResolveAliases } = require('../../build/lib/webpack');

const outPath = path.resolve(__dirname, 'dist');
//const typeshedFallback = path.resolve(__dirname, '..', 'pyright-internal', 'typeshed-fallback');

/**@type {(env: any, argv: { mode: 'production' | 'development' | 'none' }) => import('webpack').Configuration}*/
module.exports = (_, { mode }) => {
    return {
        mode: 'none',
        context: __dirname,
        entry: {
            //extension: './src/extension.ts',
            server: './src/browserMain.ts',
        },
        target: 'webworker',
        output: {
            filename: '[name].js',
            path: outPath,
            library: 'serverExportVar',
            libraryTarget: 'var',
            devtoolModuleFilenameTemplate:
                mode === 'development' ? '../[resource-path]' : monorepoResourceNameMapper('vscode-pyright'),
            clean: true,
        },
        devtool: mode === 'development' ? 'source-map' : 'nosources-source-map',
        cache: mode === 'development' ? cacheConfig(__dirname, __filename) : false,
        stats: {
            all: false,
            errors: true,
            warnings: true,
            publicPath: true,
            timings: true,
        },
        resolve: {
            mainFields: ['browser', 'module', 'main'],
            extensions: ['.ts', '.js'],
            alias: {
                ...tsconfigResolveAliases('tsconfig.json'),
                './common/realFileSystem': path.resolve(__dirname, 'src/fakeFileSystem'),
            },
            fallback: {
                path: require.resolve('path-browserify'),
                os: false,
                crypto: false,
                buffer: require.resolve('buffer/'),
                stream: false,
                child_process: false,
                fs: false,
            },
        },
        externals: {
            vscode: 'commonjs vscode',
            fsevents: 'commonjs2 fsevents',
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json',
                    },
                },
                {
                    test: /src[\\|/]typeShed\.ts$/,
                    use: [
                        {
                            loader: path.resolve(__dirname, 'typeshed-loader'),
                        },
                    ],
                },
            ],
        },
        plugins: [
            new DefinePlugin({
                process: "{ env: {}, execArgv: [], cwd: () => '/' }",
            }),
            new ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
        ],
    };
};
