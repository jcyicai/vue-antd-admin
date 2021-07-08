<template>
	<a-layout-content class="app-main">
		<transition name="fade-transform" mode="out-in">
			<router-view v-slot="{ Component, route }">
				<keep-alive>
					<component :is="Component" :key="route.path" />
				</keep-alive>
			</router-view>
		</transition>
	</a-layout-content>
</template>

<script>
export default {
	name: 'AppMain',
	setup() {
		return {}
	}
}
</script>

<style lang="less" scoped>
.app-main {
	height: calc(100vh - 48px);
	margin-left: 200px;
	margin-top: 48px;
	transition: margin-left 0.2s;
}
</style>
