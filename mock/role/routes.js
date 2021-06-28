// Just a mock data

const constantRoutes = [
	{
		path: '/redirect',
		component: 'layout/Layout',
		hidden: true,
		children: [
			{
				path: '/redirect/:path*',
				component: 'views/redirect/index'
			}
		]
	},
	{
		path: '/login',
		component: 'views/login/index',
		hidden: true
	},
	{
		path: '/404',
		component: 'views/error-page/404',
		hidden: true
	},
	{
		path: '/',
		component: 'layout/Layout',
		redirect: 'dashboard',
		children: [
			{
				path: 'dashboard',
				component: 'views/dashboard/index',
				name: '首页',
				meta: { title: '首页', icon: 'dashboard', affix: true }
			}
		]
	}
]

const asyncRoutes = [
	{
		path: '/workflow',
		component: 'layout/Layout',
		name: 'workflow',
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
	{ path: '/:path(.*)*', redirect: '/404', hidden: true }
]

module.exports = {
	constantRoutes,
	asyncRoutes
}
