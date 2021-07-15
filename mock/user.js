const tokens = {
	admin: {
		token: 'admin-token'
	},
	editor: {
		token: 'editor-token'
	}
}

const users = {
	'admin-token': {
		roles: ['admin'],
		introduction: 'I am a super administrator',
		avatar: '',
		name: 'Jason Chen'
	},
	'editor-token': {
		roles: ['editor'],
		introduction: 'I am an editor',
		avatar: '',
		name: 'Normal Editor'
	}
}

module.exports = [
	// 用户登录
	{
		url: '/jc-admin/user/login',
		type: 'post',
		response: (config) => {
			const { username } = config.body
			const token = tokens[username]

			// mock错误
			if (!token) {
				return {
					code: 604,
					message: '用户名或者密码错误'
				}
			}

			return {
				code: 200,
				data: token
			}
		}
	},

	// 获取用户信息
	{
		url: '/jc-admin/user/info.*',
		type: 'get',
		response: (config) => {
			debugger
			const { token } = config.query
			const info = users[token]

			// mock错误
			if (!info) {
				return {
					code: 508,
					message: '登录失败，无法获取用户信息'
				}
			}

			return {
				code: 200,
				data: info
			}
		}
	},

	// 用户退出
	{
		url: '/jc-admin/user/logout',
		type: 'post',
		response: (_) => {
			return {
				code: 200,
				data: 'success'
			}
		}
	}
]
