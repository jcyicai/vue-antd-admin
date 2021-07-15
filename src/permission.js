import router from './router'
import store from './store'
import { message } from 'ant-design-vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/redirect'] // 没有重定向白名单

router.beforeEach(async (to, from, next) => {
	NProgress.start()

	//设置页面title
	document.title = getPageTitle(to.meta.title)

	// 判断用户是否登录
	const hasToken = getToken()

	if (hasToken) {
		if (to.path === '/login') {
			// 如果已登录，重定向主页
			next({ path: '/' })
			NProgress.done()
		} else {
			// 判断用户获取到权限
			const hasRoles = store.getters.roles && store.getters.roles.length > 0
			if (hasRoles) {
				next()
			} else {
				try {
					// 获取用户信息
					const { roles } = await store.dispatch('user/getInfo')

					// 获取权限路由
					const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

					// 动态添加权限路由 vue-router4 api 修改为单个添加
					accessRoutes.forEach((route) => {
						router.addRoute(route)
					})
					// 导航不会留下历史记录
					next({ ...to, replace: true })
				} catch (error) {
					// 移除token 返回登录
					await store.dispatch('user/resetToken')
					message.error(error || '有错误')
					next(`/login?redirect=${to.path}`)
					NProgress.done()
				}
			}
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			// 其他没有访问权限的页面被重定向到登录页面
			next(`/login?redirect=${to.path}`)
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	NProgress.done()
})
