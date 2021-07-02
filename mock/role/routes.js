// Just a mock data

const constantRoutes = [
	/* 	{
		path: '/redirect',
		component: 'layout/Layout',
		hidden: true,
		children: [
			{
				path: '/redirect/:path(.*)',
				component: 'views/redirect/index'
			}
		]
	}, */
	{
		path: '/login',
		name: 'Login',
		component: 'views/login/index',
		hidden: true
	},
	{
		path: '/404',
		name: '404',
		component: 'views/error-page/404',
		hidden: true
	},
	{
		path: '/',
		component: 'layout/Layout',
		name: 'Dashboard',
		redirect: '/dashboard',
		children: [
			{
				path: 'dashboard',
				component: 'views/dashboard/index',
				name: 'Dashboard',
				meta: { title: '首页', icon: 'dashboard' }
			}
		]
	}
]

const asyncRoutes = [
	{
		path: '/workflow',
		component: 'layout/Layout',
		name: 'Workflow',
		meta: {
			title: '工作任务',
			icon: 'documentation',
			roles: ['admin']
		},
		children: [
			{
				path: 'issuedTask',
				component: () => import('@/views/workflow/issuedTask'),
				name: 'IssuedTask',
				meta: { title: '已发工作', roles: ['admin'] }
			}
		]
	},
	{ path: '/:pathMatch(.*)*', name: 'NoFound', redirect: '/404', hidden: true }
]

module.exports = {
	constantRoutes,
	asyncRoutes
}
