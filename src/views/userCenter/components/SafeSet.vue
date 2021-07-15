<template>
	<div>
		<div class="set-title"> <span>安全设置</span> </div>
		<div class="set-info">
			<a-row>
				<a-col :md="24" :lg="16">
					<a-form layout="vertical" :model="formState">
						<a-form-item label="当前密码" required>
							<a-input-password v-model:value="formState.oldPassword" placeholder="请输入" />
						</a-form-item>
						<a-form-item label="新密码" required>
							<a-input-password v-model:value="formState.newPassword" placeholder="请输入" />
							<password-meter @score="onScore" :password="formState.newPassword" />
						</a-form-item>
						<a-form-item label="确认密码" required>
							<a-input-password v-model:value="formState.confirmPassword" placeholder="请输入" />
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
import PasswordMeter from 'vue-simple-password-meter'

export default {
	name: 'SafeSet',
	components: { PasswordMeter },
	setup() {
		// data
		const formState = reactive({
			oldPassword: '',
			newPassword: '',
			confirmPassword: ''
		})

		const score = ref(null)

		// methods
		const onScore = (payload) => {
			//console.log(payload.score) // from 0 to 4
			//console.log(payload.strength) // one of : 'risky', 'guessable', 'weak', 'safe' , 'secure'
			score.value = payload.score
		}

		const handleUpdate = () => {
			message.success('更新成功')
		}

		return {
			formState,
			score,
			handleUpdate,
			onScore
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

.po-password-strength-bar {
	border-radius: 2px;
	transition: all 0.2s linear;
	height: 5px;
	margin-top: 8px;
}

.po-password-strength-bar.risky {
	background-color: #f95e68;
}

.po-password-strength-bar.guessable {
	background-color: #fb964d;
}

.po-password-strength-bar.weak {
	background-color: #fdd244;
}

.po-password-strength-bar.safe {
	background-color: #b0dc53;
}

.po-password-strength-bar.secure {
	background-color: #35cc62;
}
</style>
