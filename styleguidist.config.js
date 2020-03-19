const path = require('path');
const { version } = require('./package');

module.exports = {
	components: 'src/components/**/[A-Z]*.tsx',
	defaultExample: true,
	moduleAliases: {
		'rsg-example': path.resolve(__dirname, 'src'),
	},
	ribbon: {
		url: 'https://github.com/caperso/gearware',
	},
	version,
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.less$/,
					loader: 'less-loader!style-loader!css-loader',
				},
			],
		},
	},
};