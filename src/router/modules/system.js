import Layout from '@/layout'

const systemRouter = {
	path: '/system',
	component: Layout,
	redirect: 'roleList',
	alwaysShow: true,
	name: 'System',
	meta: {
		title: '系统管理',
		icon: 'SettingOutlined',
		roles: ['admin']
	},
	children: [
		{
			path: 'roleList',
			component: () => import('@/views/system/roleList'),
			name: 'RoleList',
			meta: {
				title: '角色管理',
				roles: ['admin']
			}
		}
	]
}

export default systemRouter
