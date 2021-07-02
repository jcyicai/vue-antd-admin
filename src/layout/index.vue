<template>
	<a-layout class="layout-container">
		<a-layout-sider
			:style="{ overflow: 'auto', height: '100vh' }"
			v-model:collapsed="isCollapsed"
			:trigger="null"
			collapsible
		>
			<sidebar :isCollapsed="isCollapsed" />
		</a-layout-sider>
		<!-- 	<sidebar :collapsed="isCollapsed" /> -->
		<a-layout>
			<navbar :isCollapsed="isCollapsed" @icon-click="handleIconClick" />
			<app-main></app-main>
		</a-layout>
	</a-layout>
</template>

<script>
import { Sidebar, Navbar, AppMain } from './components'
import { ref } from 'vue'
export default {
	name: 'Layout',
	components: { Sidebar, Navbar, AppMain },
	setup() {
		const isCollapsed = ref(false)
		const handleIconClick = () => {
			isCollapsed.value = !isCollapsed.value
		}
		return {
			isCollapsed,
			handleIconClick
		}
	}
}
</script>

<style lang="less" scoped>
.ml-200 {
	margin-left: 200px;
}
.ml-80 {
	margin-left: 80px;
}
</style>
