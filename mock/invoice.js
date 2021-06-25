const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    applyNo: '@guid',
    'status|1': ['可执行', '已录入'],
    applyDate: '@date("yyyy-MM-dd")',
    applierName: '@cname',
    contractNo: '@guid',
    inCorpId: 1,
    'inCorpName|1': ['国金金属网信息科技有限公司', '金迈资源有限公司'],
    outCorpId: 1,
    'outCorpName|1': ['上海五锐金属集团', '国泰贸易有限公司'],
    assetId: 1,
    'assetName|1': ['电解铜', '电解镍', '电解铝'],
    'applyBala|1-1000.2': 1,
    'openBala|1-1000.2': 1,
    'unOpenBala|1-1000.2': 1,
    currencyId: 1,
    'currencyName|1': ['人民币', '美元'],
    'applyWeight|1-100.4': 1,
    'openWeight|1-100.4': 1,
    'unOpenWeight|1-100.4': 1,
    unitId: 1,
    'unitName|1': ['吨', '千克'],
    'applyTypeName|1': ['开票申请']
  }))
}

module.exports = [
  {
    url: '/invoiceApply/list',
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
        code: 20000,
        data: {
          total: List.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/invoiceApply/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const item of List) {
        if (item.id === +id) {
          return {
            code: 20000,
            data: item
          }
        }
      }
    }
  },

  {
    url: '/invoiceApply/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/invoiceApply/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

