const getters = {
	token: (state) => state.user.token,
	avatar: (state) => state.user.avatar,
	introduction: (state) => state.user.introduction,
	name: (state) => state.user.name,
	roles: (state) => state.user.roles,
	permission_routes: (state) => state.permission.routes
}
export default getters
