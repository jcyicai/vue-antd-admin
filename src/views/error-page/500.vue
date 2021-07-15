<template>
	<div
		><a-result status="500" title="500" sub-title="抱歉，服务器报告错误。">
			<template #extra>
				<a-button type="primary" @click="handleClick">返回首页</a-button>
			</template>
		</a-result></div
	>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
	name: '500',
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
