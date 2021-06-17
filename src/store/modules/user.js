import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
	token: getToken(),
	introduction: '',
	name: '',
	avatar: '',
	roles: []
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_INTRODUCTION: (state, introduction) => {
		state.introduction = introduction
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	}
}

const actions = {
	// user login
	login({ commit }, userInfo) {
		const { username, password } = userInfo
		return new Promise((resolve, reject) => {
			login({ username: username.trim(), password: password })
				.then((response) => {
					const { data } = response
					commit('SET_TOKEN', data.token)
					setToken(data.token)
					resolve()
				})
				.catch((error) => {
					reject(error)
				})
		})
	},

	// get user info
	getInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
			getInfo(state.token)
				.then((response) => {
					const { data } = response

					if (!data) {
						reject('验证失败，请重新登录')
					}

					const { roles, name, avatar, introduction } = data

					// roles must be a non-empty array
					if (!roles || roles.length <= 0) {
						reject('getInfo: roles不能为空!')
					}

					commit('SET_ROLES', roles)
					commit('SET_NAME', name)
					commit('SET_AVATAR', avatar)
					commit('SET_INTRODUCTION', introduction)
					resolve(data)
				})
				.catch((error) => {
					reject(error)
				})
		})
	},

	// user logout
	logout({ commit, state, dispatch }) {
		return new Promise((resolve, reject) => {
			logout(state.token)
				.then(() => {
					commit('SET_TOKEN', '')
					commit('SET_ROLES', [])
					removeToken()
					resetRouter()

					resolve()
				})
				.catch((error) => {
					reject(error)
				})
		})
	},

	// remove token
	resetToken({ commit }) {
		return new Promise((resolve) => {
			commit('SET_TOKEN', '')
			commit('SET_ROLES', [])
			removeToken()
			resolve()
		})
	},

	// dynamically modify permissions
	async changeRoles({ commit, dispatch }, role) {
		const token = role + '-token'

		commit('SET_TOKEN', token)
		setToken(token)

		const { roles } = await dispatch('getInfo')

		resetRouter()

		// 获取当前用户权限路由
		const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
		// 动态添加路由
		accessRoutes.forEach((route) => {
			router.addRoute(route)
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
