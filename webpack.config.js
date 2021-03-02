const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

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
		new HTMLWebpackPlugin({
			template: PATHS.src + '/views/pages/blog.pug',
			filename: './blog.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new CopyPlugin(
			{
				patterns: [{
					from: path.resolve(__dirname, "src/img"),
					to: path.resolve(__dirname, "dist/img")
				}]
			}
		),
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
			},
			{
				test: /\.(mp4|jpg|png|svg)$/,
				use: ['file-loader']
			}
		]
	}
}