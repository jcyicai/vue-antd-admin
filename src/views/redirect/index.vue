<template>
	<div> </div>
</template>

<script>
import { unref } from 'vue'
import { useRouter } from 'vue-router'

export default {
	name: 'Redirect',
	setup() {
    debugger
		const { currentRoute, replace } = useRouter()

		const { params, query } = unref(currentRoute)
		const { path } = params

		const _path = Array.isArray(path) ? path.join('/') : path

		replace({
			path: '/' + _path,
			query
		})

		return {}
	}
}
</script>

<style lang="less" scoped></style>
