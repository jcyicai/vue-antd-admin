<template>
	<section class="app-main">
		<!-- 	<transition name="fade-transform" mode="out-in">
			<keep-alive>
				<router-view :key="key" />
			</keep-alive>
		</transition> -->
		主页
	</section>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
	name: 'AppMain',
	setup() {
		const route = useRoute()
		const key = computed(() => {
			return route.path
		})
		return {
			key
		}
	}
}
</script>

<style lang="less" scoped>
.app-main {
	min-height: calc(100vh - 84px);
}
</style>
