const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

const name = process.env.VUE_APP_TITLE || 'JC Admin'

const port = process.env.port || 9090

module.exports = {
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	devServer: {
		port: port,
		open: true,
		overlay: {
			warnings: false,
			errors: true
		},
		before: require('./mock/mock-server.js')
	},
	configureWebpack: {
		name: name,
		resolve: {
			alias: {
				'@': resolve('src')
			}
		},
		performance: {
			hints: false
		}
	},
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [path.resolve(__dirname, './src/*.less')]
		}
	},
	css: {
		sourceMap: false,
		loaderOptions: {
			less: {
				javascriptEnabled: true
			}
		}
	}
}
