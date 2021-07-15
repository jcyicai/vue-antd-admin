<template>
	<div
		><a-result status="403" title="403" sub-title="抱歉，您无权访问此页面。">
			<template #extra>
				<a-button type="primary" @click="handleClick">返回首页</a-button>
			</template>
		</a-result></div
	>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
	name: '403',
	setup() {
		// data
		const router = useRouter()

		// methods
		const handleClick = () => {
			router.push('/')
		}

		return {
			handleClick
		}
	}
}
</script>

<style lang="less" scoped></style>
