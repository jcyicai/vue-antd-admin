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
				<a-table bordered :data-source="roleData" :columns="columns">
					<template #operation="{ record }">
						<a-popconfirm
							v-if="dataSource.length"
							title="确认删除?"
							@confirm="handleRowDelete(record.key)"
						>
							<a>删除</a>
						</a-popconfirm>
					</template>
				</a-table>
			</div>
		</div>
	</div>
</template>

<script>
import { PlusOutlined } from '@ant-design/icons-vue'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import { ref } from 'vue'
export default {
	name: 'RoleList',
	setup() {
		const roleData = ref([
			{
				key: '1',
				name: 'admin'
			},
			{
				key: '2',
				name: 'editor'
			}
		])
		return {
			roleData
		}
	}
}
</script>

<style lang="less" scoped>
.role-container {
	padding: 20px;
}
</style>
