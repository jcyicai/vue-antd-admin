<template>
	<div class="layout-sidebar">
		<div class="layout-logo">
			<router-link to="/">
				<img alt="JC Admin" src="../../assets/images/logo-jc.png" />
				<span>JC Admin</span>
			</router-link>
		</div>
		<a-menu
			mode="inline"
			theme="dark"
			:inline-collapsed="false"
			v-model:selectedKeys="selectedKeys"
		>
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
	</div>
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
import { ref } from 'vue'
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
	setup(props) {
		const selectedKeys = ref('3')
		return {
			selectedKeys
		}
	}
}
</script>

<style lang="less" scoped>
.layout-sidebar {
	width: 200px;
	height: 100%;
	background: #001529;
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
			width: 30px;
			vertical-align: middle;
		}
	}
}
</style>
