<template>
	<div class="role-container">
		<div class="wrapper">
			<div class="search-box">
				<a-button type="primary">
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
					<template #operation>
						<a @click="handleFlowConfig">配置</a>
					</template>
				</a-table>
			</div>
		</div>

		<a-modal
			v-model:visible="visible"
			title="配置"
			cancelText="取消"
			okText="保存"
			@ok="handleSave"
			width="100%"
			wrapClassName="full-modal"
		>
			<a-row>
				<a-col :span="18">
					<logic-flow ref="lf" :nodeData="nodeData" @node-click="handleNodeClick" />
				</a-col>
				<a-col :span="6" class="node-form">
					<h1>节点信息</h1>
					<a-form :model="nodeForm" :labelCol="labelCol">
						<a-form-item label="节点ID">
							<a-input v-model:value="nodeForm.id" disabled />
						</a-form-item>
						<a-form-item label="节点名称">
							<a-input v-model:value="nodeForm.name" />
						</a-form-item>
					</a-form>
				</a-col>
			</a-row>
		</a-modal>
	</div>
</template>

<script>
import { message } from 'ant-design-vue'
import { getRoles, deleteRole } from '@/api/role'
import { ref, reactive, onMounted, watch } from 'vue'
import LogicFlow from '@/components/LogicFlow'
import _ from 'lodash'

export default {
	name: 'ApprovalFlowConfig',
	components: { LogicFlow },
	setup() {
		const loading = ref(false)
		const visible = ref(false)
		const nodeData = reactive({})
		const nodeForm = reactive({
			id: '',
			name: ''
		})
		const labelCol = { span: 6 }
		const lf = ref(null)

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
				title: '流程名称',
				dataIndex: 'name',
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

		const handleFlowConfig = () => {
			visible.value = true
		}

		const handleSave = () => {
			//visible.value = false
			//console.log(lf.value.getFlowData())
		}

		const handleNodeClick = (data) => {
			nodeForm.id = data.id
			nodeForm.name = data.text?.value
		}

		// watch
		watch(
			() => _.cloneDeep(nodeForm),
			(curForm, prevForm) => {
				//console.log(curForm, prevForm)
				lf.value.uppdateNodeEdgeText(curForm.id, curForm.name)
			},
			{ deep: true }
		)

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
			nodeData,
			nodeForm,
			labelCol,
			lf,

			getRoleData,
			handleRowDelete,
			handleFlowConfig,
			handleSave,
			handleNodeClick
		}
	}
}
</script>

<style lang="less">
.full-modal {
	.ant-modal {
		max-width: 100%;
		top: 0;
		padding-bottom: 0;
		margin: 0;
	}
	.ant-modal-content {
		display: flex;
		flex-direction: column;
	}
	.ant-modal-body {
		flex: 1;
		padding: 0;
		height: calc(100vh - 40px);
	}
}
</style>

<style lang="less" scoped>
.role-container {
	padding: 20px;
}
.node-form {
	padding: 14px;
	h1 {
		font-size: 16px;
		margin-bottom: 8px;
		font-weight: bold;
	}
}
</style>
