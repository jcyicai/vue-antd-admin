<template>
	<div class="role-container">
		<div class="wrapper">
			<!-- <div class="search-box">
				<a-button type="primary">
					<template #icon>
						<PlusOutlined />
					</template>
					新增
				</a-button>
			</div> -->
			<div class="content-box">
				<a-table
					bordered
					:dataSource="roleData"
					:columns="columns"
					size="small"
					:pagination="pagination"
					:loading="loading"
				>
					<template #operation="{  record }">
						<a @click="handleAllotAuth(record)">分配权限</a>
					</template>
				</a-table>
			</div>
		</div>

		<a-modal
			:title="modalTitle"
			v-model:visible="visible"
			:confirm-loading="confirmLoading"
			cancelText="取消"
			okText="保存"
			:maskClosable="false"
			@ok="handleOk"
			@cancel="handleCancel"
		>
			<div class="role-tree-box">
				<a-input-search
					v-model:value="searchTreeValue"
					style="margin-bottom: 8px"
					placeholder="搜索权限"
				/>
				<a-tree
					:tree-data="treeData"
					:autoExpandParent="autoExpandParent"
					v-model:expandedKeys="expandedKeys"
					v-model:checkedKeys="checkedKeys"
					@expand="handleTreeExpand"
					@check="handleTreeCheck"
					checkable
					:selectable="false"
				>
					<template #title="{ title }">
						<span v-if="title.indexOf(searchTreeValue) > -1">
							{{ title.substr(0, title.indexOf(searchTreeValue)) }}
							<span style="color: #f50">{{ searchTreeValue }}</span>
							{{ title.substr(title.indexOf(searchTreeValue) + searchTreeValue.length) }}
						</span>
						<span v-else>{{ title }}</span>
					</template>
				</a-tree>
			</div>
		</a-modal>
	</div>
</template>

<script>
import { getRoles } from '@/api/role'
import { ref, reactive, onMounted, watch, nextTick } from 'vue'

export default {
	name: 'RolePermissionList',
	setup() {
		// data
		const loading = ref(false)
		const visible = ref(false)
		const confirmLoading = ref(false)
		const modalTitle = ref('')
		// tree
		const searchTreeValue = ref('')
		const autoExpandParent = ref(true)
		const expandedKeys = ref([])
		const checkedKeys = ref([])
		const treeData = ref([])
		// table
		const roleData = ref([])
		const pagination = reactive({
			total: 0,
			size: 'middle',
			defaultPageSize: 20,
			current: 1,
			pageSize: 20, //每页中显示10条数据
			showSizeChanger: true,
			showQuickJumper: true,
			pageSizeOptions: ['10', '20', '30'], //每页中显示的数据
			showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
			onShowSizeChange: (current, pageSize) => (pagination.pageSize = pageSize), // 改变每页数量时更新显示
			onChange: (page, pageSize) => (pagination.current = page) //点击页码事件
		})
		const columns = ref([
			{
				title: '序号',
				dataIndex: 'serial',
				width: 60,
				align: 'center',
				customRender: ({ t, r, index }) => {
					return `${(pagination.current - 1) * pagination.pageSize + parseInt(index) + 1}`
				}
			},
			{
				title: '角色名',
				dataIndex: 'name',
				width: 120
			},
			{
				title: '角色key',
				dataIndex: 'key',
				width: 120
			},
			{
				title: '描述',
				dataIndex: 'description'
			},
			{
				title: '操作',
				dataIndex: 'operation',
				slots: { customRender: 'operation' }
			}
		])

		// methods
		const getRoleData = () => {
			// 获取权限数据
			loading.value = true
			getRoles().then((res) => {
				if (res.code === 200) {
					setTimeout(() => {
						roleData.value = res.data
						pagination.total = res.data.length
						loading.value = false
					}, 2000)
				}
			})
		}

		const handleTreeExpand = (keys) => {
			expandedKeys.value = keys
			autoExpandParent.value = false
		}

		const handleTreeCheck = (checkedKeys, e) => {
			checkedKeys.value = checkedKeys
		}

		const handleAllotAuth = (row) => {
			// 分配权限
			visible.value = true
			modalTitle.value = `当前分配角色--${row.name}`
			treeData.value = getTreeData(row.routes)
			checkedKeys.value = getCheckedKeys(row.routes, [])
		}

		const getCheckedKeys = (data, dataList) => {
			// 递归处理选择数据
			for (let i = 0; i < data.length; i++) {
				const node = data[i]
				const { path } = node
				dataList.push(path)
				if (node.children) {
					getCheckedKeys(node.children, dataList)
				}
			}
			return dataList
		}

		const getTreeData = (arr) => {
			// 递归处理权限数据
			if (!Array.isArray(arr) && arr.length < 1) return
			let newArr = []
			arr.forEach((item) => {
				if (item.children && item.children.length > 0) {
					let childArr = getTreeData(item.children)
					newArr.push({ key: item.path, title: item.meta.title, children: childArr })
				} else {
					newArr.push({ key: item.path, title: item.meta.title })
				}
			})

			return newArr
		}

		const handleOk = () => {
			// 弹窗确认
			initModal()
			//console.log(checkedKeys.value)
		}

		const handleCancel = () => {
			initModal()
		}

		const initModal = () => {
			expandedKeys.value = []
			searchTreeValue.value = ''
			visible.value = false
			autoExpandParent.value = false
		}

		const getParentKey = (key, tree) => {
			// 递归获取父级key
			let parentKey

			for (let i = 0; i < tree.length; i++) {
				const node = tree[i]

				if (node.children) {
					if (node.children.some((item) => item.key === key)) {
						parentKey = node.key
					} else if (getParentKey(key, node.children)) {
						parentKey = getParentKey(key, node.children)
					}
				}
			}

			return parentKey
		}

		const generateList = (data, dataList) => {
			// 将树形节点改为一维数组
			for (let i = 0; i < data.length; i++) {
				const node = data[i]
				const { key, title } = node
				dataList.push({ key, title })
				if (node.children) {
					generateList(node.children, dataList)
				}
			}
			return dataList
		}

		// watch
		watch(searchTreeValue, (value) => {
			// 监听搜索框
			if (!value) {
				expandedKeys.value = []
				return
			}
			const dataList = generateList(treeData.value, [])
			const expanded = dataList
				.map((item) => {
					if (item.title.indexOf(value) > -1) {
						return getParentKey(item.key, treeData.value)
					}
					return null
				})
				.filter((item, i, self) => item && self.indexOf(item) === i)
			expandedKeys.value = expanded
			searchTreeValue.value = value
			autoExpandParent.value = true
		})

		// mounted
		onMounted(() => {
			getRoleData()
		})

		return {
			roleData,
			columns,
			pagination,
			loading,
			visible,
			confirmLoading,
			modalTitle,

			treeData,
			searchTreeValue,
			expandedKeys,
			checkedKeys,
			autoExpandParent,

			handleTreeExpand,
			handleTreeCheck,
			handleOk,
			handleCancel,
			getRoleData,
			handleAllotAuth
		}
	}
}
</script>

<style lang="less" scoped>
.role-container {
	padding: 20px;
}
.role-tree-box {
	height: 400px;
	overflow-y: auto;
}
</style>
