const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const PATHS = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
};

module.exports = {
	mode: 'development',
	entry: PATHS.src + '/js/index.js',
	output: {
		path: PATHS.dist,
		filename: '[name].[hash].js'
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: PATHS.src + '/views/pages/about.pug'
		}),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: [
					{
						loader: 'pug-loader',
						options: {
							pretty: true
						}
					}
				]
			}
		]
	}
}