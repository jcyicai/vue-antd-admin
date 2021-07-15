import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layout/index.vue'
import userCenterRouter from './modules/userCenter'
import system from './modules/system'
import permission from './modules/permission'

export const constantRoutes = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue'),
		hidden: true,
		meta: { title: '登录', icon: 'login' }
	},
	{
		path: '/403',
		name: '403',
		component: () => import('@/views/error-page/403'),
		hidden: true
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/error-page/404'),
		hidden: true
	},
	{
		path: '/500',
		name: '500',
		component: () => import('@/views/error-page/500'),
		hidden: true
	},
	{
		path: '/',
		component: Layout,
		name: 'Dashboard',
		redirect: '/dashboard',
		children: [
			{
				path: 'dashboard',
				component: () => import('@/views/dashboard/index.vue'),
				name: 'Dashboard',
				meta: { title: '控制台', icon: 'DashboardOutlined' }
			}
		]
	}
]

export const asyncRoutes = [
	system,
	permission,
	userCenterRouter,
	{ path: '/:pathMatch(.*)*', name: 'NoFound', redirect: '/404', hidden: true }
]

const router = createRouter({
	routes: constantRoutes,
	history: createWebHistory(),
	scrollBehavior: () => ({ left: 0, top: 0 })
})

export function resetRouter() {
	const newRouter = createRouter({
		history: createWebHistory('/'),
		routes: constantRoutes,
		scrollBehavior: () => ({ left: 0, top: 0 })
	})

	router.matcher = newRouter.matcher // reset router  踩坑处！！！
}

export default router
