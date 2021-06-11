import vue from '@vitejs/plugin-vue'

import html from 'vite-plugin-html'

import fs from 'fs'
import { resolve } from 'path'
import dotenv from 'dotenv'

const envFiles = [`.env`, `.env.${process.env.NODE_ENV}`]

for (const file of envFiles) {
	const envConfig = dotenv.parse(fs.readFileSync(file))
	for (const key in envConfig) {
		process.env[key] = envConfig[key]
	}
}

function pathResolve(dir) {
	return resolve(process.cwd(), '.', dir)
}

export default ({ command, mode }) => {
	const isBuild = command === 'build'
	return {
		base: process.env.VITE_APP_PUBLIC_PATH,
		resolve: {
			alias: [
				{
					find: /\/@\//,
					replacement: pathResolve('src') + '/'
				}
			]
		},
		server: {
			host: '127.0.0.1',
			port: process.env.VITE_APP_PORT,
			open: true
			/* '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }, */
		},
		build: {
			target: 'es2015',
			outDir: 'dist',
			terserOptions: {
				compress: {
					keep_infinity: true,
					// Used to delete console in production environment
					drop_console: isBuild
				}
			},
			brotliSize: false,
			chunkSizeWarningLimit: 2000
		},
		plugins: [
			vue(),
			html({
				minify: isBuild,
				inject: {
					injectData: {
						title: process.env.VITE_APP_BASE_TITLE
					}
				}
			})
		]
	}
}
