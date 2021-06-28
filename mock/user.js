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
		avatar: 'http://resource.cycblog.cn/image/admin_logo.png',
		name: 'Jason Chen'
	},
	'editor-token': {
		roles: ['editor'],
		introduction: 'I am an editor',
		avatar: 'http://resource.cycblog.cn/image/admin_logo.png',
		name: 'Normal Editor'
	}
}

module.exports = [
	// user login
	{
		url: '/jc-admin/user/login',
		type: 'post',
		response: (config) => {
			const { username } = config.body
			const token = tokens[username]

			// mock error
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

	// get user info
	{
		url: '/jc-admin/user/info.*',
		type: 'get',
		response: (config) => {
			debugger
			const { token } = config.query
			const info = users[token]

			// mock error
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

	// user logout
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
