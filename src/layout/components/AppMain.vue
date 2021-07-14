<template>
	<a-layout-content class="app-main">
		<router-view v-slot="{ Component, route }">
			<transition name="fade-transform" mode="out-in">
				<!-- 	<keep-alive> -->
				<component :is="Component" :key="route.path" />
				<!-- 	</keep-alive> -->
			</transition>
		</router-view>
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
