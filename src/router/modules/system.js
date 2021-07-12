import Layout from '@/layout'

const systemRouter = {
	path: '/system',
	component: Layout,
	redirect: '/system/roleList',
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
		},
		{
			path: 'approvalFlowConfig',
			component: () => import('@/views/system/approvalFlowConfig'),
			name: 'ApprovalFlowConfig',
			meta: {
				title: '审批流配置',
				roles: ['admin']
			}
		}
	]
}

export default systemRouter
