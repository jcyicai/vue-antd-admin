const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    currencyName: '@cname(2,5)',
    currencyEName: '@name(2,5)',
    currencyShort: '@string(2,3)',
    'currencyFlag|1': '@string',
    'status|1': ['可执行', '已冻结']
  }))
}

module.exports = [
  {
    url: '/currency/list',
    type: 'get',
    response: config => {
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

      const pageList = List.filter((item, index) => index < limit * page && index >= limit * (page - 1))

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
    url: '/currency/detail',
    type: 'get',
    response: config => {
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
    url: '/currency/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/currency/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

