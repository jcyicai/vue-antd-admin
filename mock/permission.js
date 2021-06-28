const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
	List.push(
		Mock.mock({
			id: '@increment',
			'status|1': ['在职', '离职'],
			'sex|1': ['男', '女'],
			name: '@cname',
			'accountName|6': '@name',
			'deptName|1': ['铜部', '综合管理部', '镍部']
		})
	)
}

module.exports = [
	{
		url: '/employeeAuth/list',
		type: 'get',
		response: (config) => {
			const { page = 1, limit = 20 } = config.query

			/*   let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      } */

			const pageList = List.filter(
				(item, index) => index < limit * page && index >= limit * (page - 1)
			)

			return {
				code: 200,
				data: {
					total: List.length,
					items: pageList
				}
			}
		}
	},

	{
		url: '/employeeAuth/detail',
		type: 'get',
		response: (config) => {
			const { id } = config.query
			for (const item of List) {
				if (item.id === +id) {
					return {
						code: 200,
						data: item
					}
				}
			}
		}
	},

	{
		url: '/employeeAuth/create',
		type: 'post',
		response: (_) => {
			return {
				code: 200,
				data: 'success'
			}
		}
	},

	{
		url: '/employeeAuth/update',
		type: 'post',
		response: (_) => {
			return {
				code: 20000,
				data: 'success'
			}
		}
	}
]
