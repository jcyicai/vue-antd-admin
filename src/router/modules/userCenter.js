import Layout from '@/layout'

const userCenterRouter = {
	path: '/userCenter',
	component: Layout,
	redirect: 'userSet',
	alwaysShow: true,
	name: 'UserCenter',
	meta: {
		title: '个人中心',
		icon: 'UserOutlined',
		roles: ['admin', 'editor']
	},
	children: [
		{
			path: 'userSet',
			component: () => import('@/views/userCenter/userSet'),
			name: 'UserSet',
			meta: {
				title: '个人设置',
				roles: ['admin']
			}
		}
	]
}

export default userCenterRouter
