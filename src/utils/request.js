import axios from 'axios'
import { message, Modal } from 'ant-design-vue'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 5000 // 请求超时
})

//请求拦截
service.interceptors.request.use(
	(config) => {
		// 请求前处理
		if (store.getters.token) {
			// 设置headers key
			config.headers['X-Token'] = getToken()
		}
		return config
	},
	(error) => {
		// 请求错误
		return Promise.reject(error)
	}
)

// 响应拦截
service.interceptors.response.use(
	// 获取响应状态
	(response) => {
		const res = response.data

		if (res.code !== 200) {
			message.error(res.message || 'Error')

			// 508: 非法token; 512: 其他用户已登录; 514: Token国企;
			if (res.code === 508 || res.code === 512 || res.code === 514) {
				// 重新登录
				Modal.confirm({
					title: '确认注销',
					content: '您已经注销，您可以取消以留在此页面，也可以重新登录',
					okText: '重新登录',
					cancelText: '取消',
					onOk() {
						store.dispatch('user/resetToken').then(() => {
							location.reload()
						})
					},
					onCancel() {}
				})
			}
			return Promise.reject(new Error(res.message || 'Error'))
		} else {
			return res
		}
	},
	(error) => {
		message.error(res.message || 'Error', 5000)
		return Promise.reject(error)
	}
)

export default service
