<template>
	<a-layout-header class="header-main">
		<div class="header-left">
			<menu-unfold-outlined v-if="isCollapsed" class="trigger" @click="handleIconClick" />
			<menu-fold-outlined v-else class="trigger" @click="handleIconClick" />
		</div>

		<breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

		<div class="header-right">
			<div class="header-right-info">
				<a-popover placement="bottom" trigger="click" :overlayClassName="jcMsgPopover">
					<template #content>
						<a-list :dataSource="data">
							<template #renderItem="{ item }">
								<a-list-item>
									<a-list-item-meta description="这是一条消息内容">
										<template #title>
											<a href="#">{{ item.title }}</a>
										</template>
										<template #avatar>
											<a-avatar
												src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"
											/>
										</template>
									</a-list-item-meta>
								</a-list-item>
							</template>
						</a-list>
					</template>
					<a-badge dot class="jc-header-badge">
						<BellOutlined class="info-icon" />
					</a-badge>
				</a-popover>
			</div>
			<a-dropdown placement="bottomRight" overlayClassName="jc-dropdown-menu">
				<div class="user-info">
					<a-avatar class="user-avatar" :size="24" :src="avatarUrl">
						<template #icon><UserOutlined /></template>
					</a-avatar>
					<span class="user-name">Jason Chen</span>
				</div>
				<template #overlay>
					<a-menu>
						<a-menu-item @click="handleToUserCenter">
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
import { ref, createVNode } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Modal } from 'ant-design-vue'
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	LoginOutlined,
	ExclamationCircleOutlined,
	BellOutlined
} from '@ant-design/icons-vue'
import Breadcrumb from '@/components/Breadcrumb'

export default {
	name: 'NavBar',
	components: {
		MenuUnfoldOutlined,
		MenuFoldOutlined,
		UserOutlined,
		LoginOutlined,
		Breadcrumb,
		BellOutlined
	},
	props: {
		isCollapsed: {
			type: Boolean,
			default: false
		}
	},
	emits: ['icon-click'],
	setup(props, { emit }) {
		// data
		const store = useStore()
		const router = useRouter()

		const avatarUrl = ref(require('@/assets/images/user.png'))
		const jcMsgPopover = ref('jc-msg-popover')
		const data = ref([
			{
				title: '消息1审批'
			},
			{
				title: '消息2审批'
			},
			{
				title: '消息3审批'
			},
			{
				title: '消息4审批'
			}
		])

		// methods
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

		const handleToUserCenter = () => {
			router.push('/userCenter')
		}

		return {
			data,
			avatarUrl,
			jcMsgPopover,

			handleIconClick,
			handleLoginOut,
			handleToUserCenter
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
.jc-msg-popover {
	max-width: 300px;
	min-width: 250px;
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
	z-index: 100;
	right: 0;
	top: 0;
	transition: left 0.2s;
	box-shadow: 0 1px 4px #eee;
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
		display: flex;
		.header-right-info {
			margin-right: 20px;
			height: 48px;
			line-height: 48px;
			.jc-header-badge {
				height: 48px;
				line-height: 48px;
				:deep(.ant-badge-dot) {
					top: 14px;
				}
			}
			.info-icon {
				font-size: 16px;
				vertical-align: middle;
				padding: 0 4px;
				cursor: pointer;
			}
		}
	}
	.breadcrumb-container {
		line-height: 48px;
		margin-left: 20px;
	}
}
</style>
