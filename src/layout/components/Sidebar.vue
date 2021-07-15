<template>
	<div>
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
		<a-menu
			mode="inline"
			theme="dark"
			v-model:selectedKeys="selectedKeys"
			v-model:openKeys="openKeys"
		>
			<sidebar-item
				v-for="route in permission_routes"
				:key="route.path"
				:item="route"
				:base-path="route.path"
			></sidebar-item>
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
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import SidebarItem from './SidebarItem'
import { useRoute } from 'vue-router'

export default {
	name: 'Sidebar',
	components: {
		MenuFoldOutlined,
		MenuUnfoldOutlined,
		PieChartOutlined,
		MailOutlined,
		DesktopOutlined,
		InboxOutlined,
		AppstoreOutlined,
		SidebarItem
	},
	props: {
		isCollapsed: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		// data
		const store = useStore()
		const route = useRoute()

		const selectedKeys = ref([])
		const openKeys = ref([])

		const permission_routes = computed(() => store.getters.permission_routes)

		// watch
		watch(
			() => route.path,
			(path) => {
				selectedKeys.value = path.indexOf('/', 1) > -1 ? [path] : [path.substr(1, path.length)]

				openKeys.value = path.indexOf('/', 1) > -1 ? [path.substr(0, path.indexOf('/', 1))] : []
			},
			{ immediate: true }
		)

		return {
			selectedKeys,
			openKeys,
			permission_routes
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
