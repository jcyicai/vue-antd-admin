<template>
	<a-breadcrumb class="app-breadcrumb">
		<a-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
			<span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1">{{
				item.meta.title
			}}</span>
			<a v-else @click.self.prevent="handleLink(item)">{{ item.meta.title }}</a>
		</a-breadcrumb-item>
	</a-breadcrumb>
</template>

<script>
import * as pathToRegexp from 'path-to-regexp'
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
	name: 'Breadcrumn',
	setup() {
		// data
		const levelList = ref(null)
		const route = useRoute()
		const router = useRouter()

		// methods
		const getBreadcrumb = () => {
			// 只显示带有meta.title的路由
			let matched = route.matched.filter((item) => item.meta && item.meta.title)
			const first = matched[0]

			if (!isDashboard(first)) {
				matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched)
			}

			levelList.value = matched.filter(
				(item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
			)
		}

		const isDashboard = (route) => {
			const name = route && route.name
			if (!name) {
				return false
			}
			return name.trim().toLocaleLowerCase() === 'dashboard'.toLocaleLowerCase()
		}

		const pathCompile = (path) => {
			const { params } = route
			const toPath = pathToRegexp.compile(path)
			return toPath(params)
		}

		const handleLink = (item) => {
			const { redirect, path } = item
			if (redirect) {
				router.push(redirect)
				return
			}
			router.push(pathCompile(path))
		}

		// watch
		watch(
			() => route.path,
			(path) => {
				if (path.startsWith('/redirect/')) {
					return
				}
				getBreadcrumb()
			},
			{ immediate: true }
		)

		// mounted
		onMounted(() => {
			getBreadcrumb()
		})

		return {
			levelList,
			getBreadcrumb,
			isDashboard,
			pathCompile,
			handleLink
		}
	}
}
</script>

<style lang="less" scoped>
.app-breadcrumb.ant-breadcrumb {
	display: inline-block;
	font-size: 14px;
	line-height: 50px;
	margin-left: 8px;
}
</style>
