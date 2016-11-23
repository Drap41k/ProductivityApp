const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./source/index.js",
	output: {
		path: __dirname + '/public/',
		filename: "main.js"
	},
	plugins: [new HtmlWebpackPlugin({
		template: './source/index.html'
	})],
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: "style!css"
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