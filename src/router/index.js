import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layout/index.vue'

export const constantRoutes = [
	{
		path: '/redirect',
		name: 'Redirect',
		component: Layout,
		hidden: true,
		children: [
			{
				path: '/redirect/:path(.*)',
				component: () => import('@/views/redirect/index.vue')
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue'),
		hidden: true,
		meta: { title: '登录', icon: 'login' }
	},
	{
		path: '/404',
		component: () => import('@/views/error-page/404'),
		hidden: true
	},
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [
			{
				path: 'dashboard',
				component: () => import('@/views/dashboard/index.vue'),
				name: 'Dashboard',
				meta: { title: '首页', icon: 'dashboard' }
			}
		]
	}
]

export const asyncRoutes = [
	{
		path: '/workflow',
		component: Layout,
		name: 'Workflow',
		meta: {
			title: '工作任务',
			icon: 'documentation'
		},
		children: [
			{
				path: 'issuedTask',
				component: () => import('@/views/workflow/issuedTask.vue'),
				name: 'IssuedTask',
				meta: { title: '已发工作' }
			}
		]
	},
	{ path: '/:path(.*)*', redirect: '/404', hidden: true }
]

const router = createRouter({
	routes: constantRoutes,
	history: createWebHistory(),
	scrollBehavior: () => ({ left: 0, top: 0 })
})

export function resetRouter() {
	router.getRoutes().forEach((route) => {
		const { name } = route
		if (name && !['Redirect', 'Login'].includes(name)) {
			router.hasRoute(name) && router.removeRoute(name)
		}
	})
}

export default router
