<template>
	<div class="layout-container">
        <sidebar/>
    </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
export default {
	name: 'Layout',
	components: { Sidebar },
	data() {
		return {}
	},
	created() {},
	mounted() {},
	methods: {}
}
</script>

<style lang="less" scoped>
.layout-container {
    height: 100%;
    overflow: hidden;
}
</style>
