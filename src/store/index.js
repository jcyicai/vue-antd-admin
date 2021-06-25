import { createStore } from 'vuex'
import getters from './getters'

const modulesFiles = require.context('./modules', true, /\.js$/)

/* Object.keys(modulesFiles).forEach((key) => {
	const moduleName = key.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
	modules[moduleName] = modulesFiles[key].default || {}
}) */
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const value = modulesFiles(modulePath)
	modules[moduleName] = value.default
	return modules
}, {})

const store = createStore({
	modules,
	getters
})

export default store
