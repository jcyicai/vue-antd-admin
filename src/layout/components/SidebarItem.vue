<template>
	<template v-if="!item.hidden">
		<template
			v-if="
				hasOneShowingChild(item.children, item) &&
					(!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
					!item.alwaysShow
			"
		>
			<a-menu-item :key="onlyOneChild.path">
				<router-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
					<component :is="$antIcons[onlyOneChild.meta.icon || (item.meta && item.meta.icon)]" />
					<span>{{ onlyOneChild.meta.title }}</span>
				</router-link>
			</a-menu-item>
		</template>

		<a-sub-menu v-else :key="resolvePath(item.path)">
			<template #title>
				<span>
					<component :is="$antIcons[item.meta && item.meta.icon]" />
					<span>{{ item.meta.title }}</span>
				</span>
			</template>
			<template v-for="child in item.children" :key="child.path">
				<router-link v-if="child.meta" :to="resolvePath(child.path)">
					<a-menu-item :key="resolvePath(child.path)">{{ child.meta.title }}</a-menu-item>
				</router-link>
			</template>
		</a-sub-menu>
	</template>
</template>

<script>
import { ref } from 'vue'
import { isExternal } from '@/utils/validate'
import path from 'path'

export default {
	name: 'SidebarItem',
	props: {
		item: {
			type: Object,
			required: true
		},
		basePath: {
			type: String,
			default: ''
		}
	},
	setup(props) {
		// data
		const onlyOneChild = ref(null)

		// methods
		const hasOneShowingChild = (children = [], parent) => {
			const showingChildren = children.filter((item) => {
				if (item.hidden) {
					return false
				} else {
					onlyOneChild.value = item
					return true
				}
			})

			// 当只有一个子路由时，默认显示该子路由
			if (showingChildren.length === 1) {
				return true
			}

			// 如果没有子路由显示，则显示父路由
			if (showingChildren.length === 0) {
				onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
				return true
			}

			return false
		}

		const resolvePath = (routePath) => {
			if (isExternal(routePath)) {
				return routePath
			}
			if (isExternal(props.basePath)) {
				return props.basePath
			}
			return path.resolve(props.basePath, routePath)
		}

		return {
			onlyOneChild,
			hasOneShowingChild,
			resolvePath
		}
	}
}
</script>

<style lang="less" scoped></style>
