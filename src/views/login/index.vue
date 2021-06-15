<template>
	<div class="jc-login">
		<div class="container">
			<el-row class="main" type="flex">
				<el-col :span="12" class="flex-item login-info">
					<div class="info-box">
						<img class="enter-x-r" alt="JC Admin" src="../../assets/svg/login-box-bg.svg" />
						<h1 class="enter-x-r">JC Admin后台管理系统</h1>
						<p class="enter-x-r"><span>欢迎使用</span></p>
					</div>
				</el-col>
				<el-col :span="12" class="flex-item login-form">
					<div class="form-box">
						<h1 class="login-title enter-x-l">登录</h1>
						<el-form ref="loginForm" :model="formData" :rules="loginRules">
							<el-form-item prop="userName" class="enter-x-l">
								<el-input v-model="formData.userName" placeholder="用户名"></el-input>
							</el-form-item>
							<el-form-item prop="password" class="enter-x-l">
								<el-input v-model="formData.password" :type="passwordType" placeholder="密码">
									<template #suffix>
										<i
											class="el-input__icon el-icon-view icon-show-pwd"
											@click="handleShowPassword"
										></i>
									</template>
								</el-input>
							</el-form-item>
							<el-form-item class="enter-x-l">
								<el-checkbox v-model="formData.isChecked">记住我</el-checkbox>
							</el-form-item>
							<el-form-item class="enter-x-l">
								<el-button
									:loading="loading"
									class="btn-login"
									type="primary"
									@click="handleRegister"
									>登录</el-button
								>
							</el-form-item>
						</el-form>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
	name: 'Login',
	setup(props) {
		const loginForm = ref()
		const formData = reactive({
			userName: '',
			password: '',
			isChecked: false
		})
		const loading = ref(false)
		const passwordType = ref('password')

		const validateUsername = (rule, value, callback) => {
			if (!value) {
				callback(new Error('请输入用户名'))
			} else {
				callback()
			}
		}

		const validatePassword = (rule, value, callback) => {
			if (value.length < 6) {
				callback(new Error('密码不能小于6位'))
			} else {
				callback()
			}
		}

		const loginRules = reactive({
			userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
			password: [{ required: true, trigger: 'blur', validator: validatePassword }]
		})

		//显示密码
		function handleShowPassword() {
			passwordType.value = passwordType.value === 'password' ? '' : 'password'
		}

		//提交登录信息
		function handleRegister() {
			loading.value = true
			loginForm.value.validate((valid) => {
				if (valid) {
					alert('登录成功')
					loading.value = false
				} else {
					console.log('登录失败')
					loading.value = false
					return false
				}
			})
		}

		return {
			loginForm,
			passwordType,
			loading,
			formData,
			loginRules,
			handleRegister,
			handleShowPassword
		}
	}
}
</script>

<style lang="scss" scoped>
.jc-login {
	overflow: hidden;
	height: 100%;
	padding: 0 16px;
	position: relative;
	&::before {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		margin-left: -48%;
		background-image: url('/@/assets/svg/login-bg.svg');
		background-position: 100%;
		background-repeat: no-repeat;
		background-size: auto 100%;
		content: '';
	}
	.container {
		margin: 0 auto;
		padding: 48px;
		height: 100%;
		.main {
			height: 100%;
			.flex-item {
				height: 100%;
			}
			.login-info {
				padding: 30px 20px 0 150px;
				position: relative;
				.info-box {
					position: absolute;
					top: 50%;
					margin-top: -190px;
					color: #fff;
					img {
						width: 50%;
						vertical-align: middle;
					}
					h1 {
						margin: 56px 0 20px 0;
						font-weight: normal;
					}
				}
			}
			.login-form {
				position: relative;
				.form-box {
					position: absolute;
					top: 50%;
					margin-top: -200px;
					padding-left: 90px;
					width: 400px;
					.login-title {
						margin-bottom: 20px;
					}
					.btn-login {
						width: 100%;
					}
					.icon-show-pwd {
						cursor: pointer;
					}
				}
			}
		}
	}
}

@for $i from 1 through 4 {
	.enter-x-l:nth-child(#{$i}) {
		opacity: 0;
		z-index: $i;
		animation: enter-x-l-animation 0.4s ease-in-out 0.3s;
		animation-fill-mode: forwards;
		animation-delay: $i * 0.1s;
	}
}

@for $i from 1 through 3 {
	.enter-x-r:nth-child(#{$i}) {
		opacity: 0;
		z-index: $i;
		animation: enter-x-r-animation 0.4s ease-in-out 0.3s;
		animation-fill-mode: forwards;
		animation-delay: $i * 0.1s;
	}
}

@keyframes enter-x-r-animation {
	from {
		transform: translateX(0);
	}
	to {
		opacity: 1;
		transform: translateX(50px);
	}
}

@keyframes enter-x-l-animation {
	from {
		transform: translateX(50px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
</style>
