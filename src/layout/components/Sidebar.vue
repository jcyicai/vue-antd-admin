<template>
	<!-- 	<div class="layout-sidebar"> -->
	<!-- <a-layout-sider v-model="isCollapsed" :trigger="null" collapsible> -->
	<div class="layout-logo" v-if="!isCollapsed">
		<router-link to="/">
			<img alt="JC Admin" src="../../assets/images/logo-jc.png" />
			<span>JC Admin</span>
		</router-link>
	</div>
	<div class="layout-logo-collapsed" v-else>
		<router-link to="/">
			<img alt="JC Admin" src="../../assets/images/logo-jc.png" />
		</router-link>
	</div>
	<a-menu mode="inline" theme="dark" v-model="selectedKeys">
		<a-menu-item key="1">
			<PieChartOutlined />
			<span>Option 1</span>
		</a-menu-item>
		<a-sub-menu key="2">
			<template #title>
				<span>
					<MailOutlined />
					<span>Navigation One</span>
				</span>
			</template>
			<a-menu-item key="3">Option 5</a-menu-item>
			<a-menu-item key="4">Option 6</a-menu-item>
			<a-menu-item key="5">Option 7</a-menu-item>
			<a-menu-item key="6">Option 8</a-menu-item>
		</a-sub-menu>
	</a-menu>
	<!-- 	</a-layout-sider> -->

	<!-- </div> -->
</template>

<script>
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
	MailOutlined,
	DesktopOutlined,
	InboxOutlined,
	AppstoreOutlined
} from '@ant-design/icons-vue'
import { ref, computed } from 'vue'
export default {
	name: 'Sidebar',
	components: {
		MenuFoldOutlined,
		MenuUnfoldOutlined,
		PieChartOutlined,
		MailOutlined,
		DesktopOutlined,
		InboxOutlined,
		AppstoreOutlined
	},
	props: {
		isCollapsed: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		const selectedKeys = ref('3')

		return {
			selectedKeys
		}
	}
}
</script>

<style lang="less" scoped>
.layout-logo {
	height: 48px;
	line-height: 48px;
	text-align: center;
	span {
		color: #fff;
		font-size: 18px;
		font-weight: bold;
		display: inline-block;
		padding-left: 8px;
		vertical-align: middle;
	}
	img {
		height: 30px;
		vertical-align: middle;
	}
}
.layout-logo-collapsed {
	text-align: center;
	line-height: 48px;
	img {
		height: 30px;
	}
}
</style>
