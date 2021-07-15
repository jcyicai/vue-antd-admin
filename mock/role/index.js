const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
	{
		id: 1,
		key: 'admin',
		name: 'admin',
		description: 'Super Administrator. Have access to view all pages.',
		routes: routes
	},
	{
		id: 2,
		key: 'editor',
		name: 'editor',
		description: 'Normal Editor. Can see all pages except permission page',
		routes: routes.filter((i) => i.path !== '/permission')
	},
	{
		id: 3,
		key: 'visitor',
		name: 'visitor',
		description: 'Just a visitor. Can only see the home page and the document page',
		routes: [
			{
				path: '',
				redirect: 'dashboard',
				children: [
					{
						path: 'dashboard',
						name: '首页',
						meta: { title: '首页', icon: 'dashboard' }
					}
				]
			}
		]
	}
]

module.exports = [
	{
		url: '/jc-admin/routes',
		type: 'get',
		response: (_) => {
			return {
				code: 200,
				data: routes
			}
		}
	},
	{
		url: '/jc-admin/roles',
		type: 'get',
		response: (_) => {
			return {
				code: 200,
				data: roles
			}
		}
	},

	// 添加role
	{
		url: '/jc-admin/role',
		type: 'post',
		response: {
			code: 200,
			data: {
				key: Mock.mock('@integer(300, 5000)')
			}
		}
	},

	// 更新role
	{
		url: '/jc-admin/role/[A-Za-z0-9]',
		type: 'put',
		response: {
			code: 200,
			data: {
				status: 'success'
			}
		}
	},

	// 删除role
	{
		url: '/jc-admin/role/[A-Za-z0-9]',
		type: 'delete',
		response: {
			code: 200,
			data: {
				status: 'success'
			}
		}
	}
]
