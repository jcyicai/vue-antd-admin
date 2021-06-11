import { createRouter, createWebHistory } from 'vue-router'

import Login from '/@/views/login/index.vue'

const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login
	}
]

const router = createRouter({
	routes,
	history: createWebHistory(),
	scrollBehavior: { top: 0 }
})

export default router
