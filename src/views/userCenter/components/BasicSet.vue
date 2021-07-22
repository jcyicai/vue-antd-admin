<template>
	<div>
		<div class="set-title"> <span>基本设置</span> </div>
		<div class="set-info">
			<a-row type="flex">
				<a-col :md="24" :lg="16">
					<a-form layout="vertical" :model="formState">
						<a-form-item label="昵称">
							<a-input v-model:value="formState.userName" placeholder="请输入您的昵称" />
						</a-form-item>
						<a-form-item label="邮箱">
							<a-input v-model:value="formState.email" placeholder="请输入您的邮箱" />
						</a-form-item>
						<a-form-item label="手机号">
							<a-input v-model:value="formState.mobile" placeholder="请输入您的手机号" />
						</a-form-item>
						<a-form-item>
							<a-button type="primary" @click="handleUpdate">更新基本信息</a-button>
						</a-form-item>
					</a-form>
				</a-col>
				<a-col :md="24" :lg="8">
					<a-upload
						v-model:file-list="fileList"
						name="avatar"
						list-type="picture-card"
						class="avatar-uploader"
						:show-upload-list="false"
						action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
						:before-upload="beforeUpload"
						@change="handleChange"
					>
						<img v-if="imageUrl" :src="imageUrl" alt="个人头像" class="jc-avatar" />
						<div v-else>
							<loading-outlined v-if="loading"></loading-outlined>
							<plus-outlined v-else></plus-outlined>
							<div class="ant-upload-text">上传头像</div>
						</div>
					</a-upload>
				</a-col>
			</a-row>
		</div>
	</div>
</template>

<script>
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'

function getBase64(img, callback) {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result))
	reader.readAsDataURL(img)
}

export default {
	name: 'BasicSet',
	components: {
		PlusOutlined,
		LoadingOutlined
	},
	setup() {
		// data
		const store = useStore()
		const formState = reactive({
			userName: '',
			email: '',
			mobile: ''
		})
		const imageUrl = ref('') //require('@/assets/images/user.png')
		const loading = ref(false)
		const fileList = ref([])

		// methods
		const handleUpdate = () => {
			message.success('更新成功')
		}

		const handleChange = (info) => {
			if (info.file.status === 'uploading') {
				loading.value = true
				return
			}
			if (info.file.status === 'done') {
				getBase64(info.file.originFileObj, (base64Url) => {
					imageUrl.value = base64Url
					loading.value = false
				})
			}
			if (info.file.status === 'error') {
				loading.value = false
				message.error('上传失败')
			}
		}

		const beforeUpload = (file) => {
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
			if (!isJpgOrPng) {
				message.error('你只能上传JPG格式！')
			}
			const isLt2M = file.size / 1024 / 1024 < 2
			if (!isLt2M) {
				message.error('图片必须小于2M！')
			}
			return isJpgOrPng && isLt2M
		}

		// mounted
		onMounted(() => {
			formState.userName = store.getters.name
			imageUrl.value = store.getters.avatar
		})

		return {
			formState,
			imageUrl,
			loading,
			fileList,

			handleUpdate,
			handleChange,
			beforeUpload
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
.set-info {
	position: relative;
	.avatar-uploader {
		position: absolute;
		left: 50%;
		top: 10%;
		margin-left: -75px;
		:deep(.ant-upload.ant-upload-select-picture-card) {
			width: 140px;
			height: 140px;
			border-radius: 50%;
		}
		.jc-avatar {
			width: 150px;
			height: 150px;
			border-radius: 50%;
		}
	}
}
</style>
