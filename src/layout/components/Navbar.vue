<template>
	<a-layout-header class="header-main">
		<div class="header-left">
			<menu-unfold-outlined v-if="isCollapsed" class="trigger" @click="handleIconClick" />
			<menu-fold-outlined v-else class="trigger" @click="handleIconClick" />
		</div>

		<breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

		<div class="header-right">
			<a-dropdown placement="bottomRight" overlayClassName="jc-dropdown-menu">
				<div class="user-info">
					<a-avatar class="user-avatar" :size="24" :src="avatarUrl">
						<template #icon><UserOutlined /></template>
					</a-avatar>
					<span class="user-name">Jason Chen</span>
				</div>
				<template #overlay>
					<a-menu>
						<a-menu-item>
							<UserOutlined />
							个人中心
						</a-menu-item>
						<a-menu-item @click="handleLoginOut">
							<LoginOutlined />
							退出
						</a-menu-item>
					</a-menu>
				</template>
			</a-dropdown>
		</div>
	</a-layout-header>
</template>

<script>
import { ref, computed, createVNode } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Modal } from 'ant-design-vue'
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	LoginOutlined,
	ExclamationCircleOutlined
} from '@ant-design/icons-vue'
import Breadcrumb from '@/components/Breadcrumb'
export default {
	name: 'NavBar',
	components: {
		MenuUnfoldOutlined,
		MenuFoldOutlined,
		UserOutlined,
		LoginOutlined,
		Breadcrumb
	},
	props: {
		isCollapsed: {
			type: Boolean,
			default: false
		}
	},
	emits: ['icon-click'],
	setup(props, { emit }) {
		const store = useStore()
		const router = useRouter()
		const route = useRoute()

		const avatarUrl = ref(require('@/assets/images/user.png'))

		const handleIconClick = () => {
			emit('icon-click')
		}

		const handleLoginOut = () => {
			Modal.confirm({
				title: '提示',
				icon: createVNode(ExclamationCircleOutlined),
				content: '您确定要退出系统吗？',
				okText: '确认',
				cancelText: '取消',
				centered: true,
				async onOk() {
					await store.dispatch('user/logout')
					router.push('/login')
				}
			})
		}

		return {
			avatarUrl,
			handleIconClick,
			handleLoginOut
		}
	}
}
</script>

<style lang="less">
.jc-dropdown-menu {
	.ant-dropdown-menu {
		li.ant-dropdown-menu-item {
			min-width: 140px;
		}
	}
}
</style>

<style lang="less" scoped>
.header-main {
	background: #fff;
	padding: 0 15px;
	height: 48px;
	line-height: 48px;
	display: flex;
	position: fixed;
	z-index: 1;
	right: 0;
	top: 0;
	transition: left 0.2s;
	.user-info {
		cursor: pointer;
		.user-avatar {
			margin-right: 8px;
		}
		.user-name {
			vertical-align: middle;
		}
	}
	.header-right {
		margin-left: auto;
	}
	.breadcrumb-container {
		line-height: 48px;
		margin-left: 20px;
	}
}
</style>
