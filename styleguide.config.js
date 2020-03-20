const path = require('path');
const { version } = require('./package');

module.exports = {
    title: 'React Style Guide Example',

    version,
    resolver: require('react-docgen').resolver.findAllComponentDefinitions,
    // propsParser: require('react-docgen-typescript').withDefaultConfig({ propFilter: { skipPropsWithoutDoc: true } }).parse,
    propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json').parse,
    components: 'src/components/**/[A-Z]*.tsx',
    ignore:['**/demo/*.{ts,tsx}'],

    ribbon: {
        url: 'https://github.com/caperso/gearware',
    },



    // version,
    // webpackConfig: {
    // 	module: {
    // 		rules: [
    // 			{
    // 				test: /\.tsx?$/,
    // 				exclude: /node_modules/,
    // 				loader: 'babel-loader',
    //             },

    // 			{
    // 				test: /\.less$/,
    // 				loader: 'less-loader!style-loader!css-loader',
    // 			},
    // 		],
    // 	},
    // },
};
