<template>
	<div>
		<div class="set-title"> <span>安全设置</span> </div>
		<div class="set-info">
			<a-row>
				<a-col :md="24" :lg="16">
					<a-form layout="vertical" :model="formState">
						<a-form-item label="原密码">
							<a-input-password
								v-model:value="formState.oldPassword"
								placeholder="请输入您的原密码"
							/>
						</a-form-item>
						<a-form-item label="新密码">
							<a-input-password
								v-model:value="formState.newPassword"
								placeholder="请输入您的新密码"
							/>
						</a-form-item>
						<a-form-item>
							<a-button type="primary" @click="handleUpdate">更新安全信息</a-button>
						</a-form-item>
					</a-form>
				</a-col>
			</a-row>
		</div>
	</div>
</template>

<script>
import { message } from 'ant-design-vue'
import { ref, reactive } from 'vue'

export default {
	name: 'SafeSet',
	setup() {
		const formState = reactive({
			oldPassword: '',
			newPassword: ''
		})

		const handleUpdate = () => {
			message.success('更新成功')
		}

		return {
			formState,
			handleUpdate
		}
	}
}
</script>

<style lang="less" scoped>
.set-title {
	color: rgba(0, 0, 0, 0.85);
	font-size: 20px;
	font-weight: 500;
	line-height: 28px;
	margin-bottom: 12px;
}
</style>
