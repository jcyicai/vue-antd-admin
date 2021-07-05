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
					<a-menu-item>{{ child.meta.title }}</a-menu-item>
				</router-link>
			</template>
		</a-sub-menu>
	</template>
</template>

<script>
import { ref, reactive } from 'vue'
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
		const onlyOneChild = ref(null)

		const hasOneShowingChild = (children = [], parent) => {
			const showingChildren = children.filter((item) => {
				if (item.hidden) {
					return false
				} else {
					// Temp set(will be used if only has one showing child)
					onlyOneChild.value = item
					return true
				}
			})

			// When there is only one child router, the child router is displayed by default
			if (showingChildren.length === 1) {
				return true
			}

			// Show parent if there are no child router to display
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
			console.log(path.resolve(props.basePath, routePath))
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
