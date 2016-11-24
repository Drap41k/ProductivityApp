const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: "./source/index.js",
	output: {
		path: __dirname + '/public/',
		filename: "main.js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './source/index.html'
		}),
		new ExtractTextPlugin('styles.css'),
	],
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract(
					'style', // backup loader when not building .css file
					'css!sass' // loaders to preprocess CSS
				)
			},
			{
				test: /\.html$/,
				loader: 'html'
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	}
};