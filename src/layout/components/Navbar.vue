<template>
	<a-layout-header class="header-main">
		<div class="header-left">
			<menu-unfold-outlined v-if="isCollapsed" class="trigger" @click="handleIconClick" />
			<menu-fold-outlined v-else class="trigger" @click="handleIconClick" />
		</div>
		<div class="header-right">
			<a-dropdown placement="bottomRight" overlayClassName="jc-dropdown-menu">
				<div class="user-info">
					<a-avatar class="user-avatar" :size="24">
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
import { ref } from 'vue'
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	LoginOutlined
} from '@ant-design/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
	name: 'NavBar',
	components: {
		MenuUnfoldOutlined,
		MenuFoldOutlined,
		UserOutlined,
		LoginOutlined
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
		const handleIconClick = () => {
			emit('icon-click')
		}

		const handleLoginOut = async () => {
			await store.dispatch('user/logout')
			router.push(`/login`)
		}

		return {
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
	justify-content: space-between;
	.user-info {
		.user-avatar {
			margin-right: 8px;
		}
		.user-name {
			vertical-align: middle;
		}
	}
}
</style>
