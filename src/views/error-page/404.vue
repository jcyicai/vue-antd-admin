<template>
	<div
		><a-result status="404" title="404" sub-title="抱歉，您访问的页面不存在。">
			<template #extra>
				<a-button type="primary" @click="handleClick">返回首页</a-button>
			</template>
		</a-result></div
	>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
	name: '404',
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
