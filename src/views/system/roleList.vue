<template>
	<div class="role-container">
		<div class="wrapper">
			<div class="search-box">
				<a-button type="primary" @click="handleShowDrawer(1)">
					<template #icon>
						<PlusOutlined />
					</template>
					新增
				</a-button>
			</div>
			<div class="content-box">
				<a-table
					bordered
					:dataSource="roleData"
					:columns="columns"
					size="small"
					:pagination="pagination"
					:loading="loading"
				>
					<template #operation="{  record,index }">
						<a @click="handleShowDrawer(2, record)">编辑</a>
						<a-divider type="vertical" />
						<a @click="handleShowDrawer(3, record)">详情</a>
						<a-divider type="vertical" />
						<a-popconfirm
							v-if="roleData.length"
							cancelText="取消"
							okText="确认"
							title="确认删除?"
							@confirm="handleRowDelete(index, record)"
						>
							<a>删除</a>
						</a-popconfirm>
					</template>
				</a-table>
			</div>
		</div>

		<a-drawer
			:title="drawerTitle"
			:width="720"
			:visible="isShowDrawer"
			:body-style="{ paddingBottom: '80px' }"
			:maskClosable="false"
			@close="handleCloseDrawer"
		>
			<a-form :model="formData" layout="vertical" v-if="!isDetail">
				<a-row :gutter="16">
					<a-col :span="12">
						<a-form-item label="角色名" name="name">
							<a-input v-model:value="formData.name" placeholder="请输入" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="角色key" name="key">
							<a-input v-model:value="formData.key" placeholder="请输入" />
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="16">
					<a-col :span="24">
						<a-form-item label="备注" name="description">
							<a-textarea v-model:value="formData.description" :rows="4" placeholder="请输入" />
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
			<a-descriptions title="角色信息" v-if="isDetail">
				<a-descriptions-item label="角色名" :span="2">{{ formData.name }}</a-descriptions-item>
				<a-descriptions-item label="角色key" :span="1">{{ formData.key }}</a-descriptions-item>
				<a-descriptions-item label="备注" :span="3">
					{{ formData.description }}
				</a-descriptions-item>
			</a-descriptions>
			<div
				:style="{
					position: 'absolute',
					right: 0,
					bottom: 0,
					width: '100%',
					borderTop: '1px solid #e9e9e9',
					padding: '10px 16px',
					background: '#fff',
					textAlign: 'right',
					zIndex: 1
				}"
			>
				<a-button style="margin-right: 8px" @click="handleCloseDrawer">取消</a-button>
				<a-button type="primary" @click="handleCloseDrawer" v-if="!isDetail">提交</a-button>
			</div>
		</a-drawer>
	</div>
</template>

<script>
import { message } from 'ant-design-vue'
import { getRoles, deleteRole } from '@/api/role'
import { ref, reactive, onMounted, computed } from 'vue'
export default {
	name: 'RoleList',
	setup() {
		// data
		const titleState = {
			1: '新增',
			2: '编辑',
			3: '详情'
		}
		const loading = ref(false)

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

		const roleData = ref([])

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

		const formData = ref({
			name: '',
			key: '',
			description: ''
		})

		const isShowDrawer = ref(false)
		const drawerTitle = ref('新增')
		const drawerStatus = ref(1)
		const isDetail = computed(() => {
			return drawerStatus.value != 1 && drawerStatus.value != 2
		})

		// methods
		const getRoleData = () => {
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

		const handleRowDelete = (index, row) => {
			deleteRole(row.key)
			roleData.value.splice(index, 1)
			message.success('删除成功')
		}

		const handleShowDrawer = (index, row) => {
			isShowDrawer.value = true
			drawerStatus.value = index
			drawerTitle.value = titleState[index]
			formData.value = Object.assign({}, formData.value, row)
		}

		const handleCloseDrawer = () => {
			isShowDrawer.value = false
		}

		// mounted
		onMounted(() => {
			getRoleData()
		})

		return {
			roleData,
			columns,
			pagination,
			loading,
			formData,
			isShowDrawer,
			drawerTitle,
			drawerStatus,
			isDetail,

			handleShowDrawer,
			handleCloseDrawer,
			getRoleData,
			handleRowDelete
		}
	}
}
</script>

<style lang="less" scoped>
.role-container {
	padding: 20px;
}
</style>
