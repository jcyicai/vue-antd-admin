import { createRouter, createWebHistory } from 'vue-router'

import Login from '/@/views/login/index.vue'
import Layout from '/@/layout/index.vue'

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [
			{
				path: 'dashboard',
				component: () => import('/@/views/dashboard/index.vue'),
				name: 'dashboard',
				meta: { title: '首页', icon: 'dashboard' }
			}
		]
	}
]

const router = createRouter({
	routes,
	history: createWebHistory(),
	scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
