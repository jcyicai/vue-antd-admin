import request from '@/utils/request'

export function getRoutes() {
	return request({
		url: '/jc-admin/routes',
		method: 'get'
	})
}

export function getRoles() {
	return request({
		url: '/jc-admin/roles',
		method: 'get'
	})
}

export function addRole(data) {
	return request({
		url: '/jc-admin/role',
		method: 'post',
		data
	})
}

export function updateRole(id, data) {
	return request({
		url: `/jc-admin/role/${id}`,
		method: 'put',
		data
	})
}

export function deleteRole(id) {
	return request({
		url: `/jc-admin/role/${id}`,
		method: 'delete'
	})
}
