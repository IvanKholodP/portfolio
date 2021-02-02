const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PATHS = {
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'dist')
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
			template: PATHS.src + '/views/pages/about.pug',
			filename: './about.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
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
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.s[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			}
		]
	}
}