<template>
	<div class="container">
		<div class="issued">
			<a-tag color="pink" v-permission="['admin']">pink</a-tag>
			<a-tag color="blue" v-permission="['editor']">blue</a-tag>
		</div>
	</div>
</template>

<script>
export default {
	name: 'IssuedTask',
	setup(props) {
		return {}
	}
}
</script>

<style lang="less" scoped></style>
