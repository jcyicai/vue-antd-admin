import Layout from '@/layout'

const permissionRouter = {
  path: '/permission',
  component: Layout,
  redirect: '/permission/employeeAuth',
  alwaysShow: true,
  name: 'Permission',
  meta: {
    title: '权限管理',
    icon: 'lock',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'employeeAuth',
      component: () => import('@/views/permission/employeeAuth'),
      name: 'employeeAuth',
      meta: {
        title: '员工权限',
        roles: ['admin']
      }
    },
    {
      path: 'page',
      component: () => import('@/views/permission/page'),
      name: 'PagePermission',
      meta: {
        title: 'Page Permission',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'directive',
      component: () => import('@/views/permission/directive'),
      name: 'DirectivePermission',
      meta: {
        title: 'Directive Permission'
        // if do not set roles, means: this page does not require permission
      }
    },
    {
      path: 'role',
      component: () => import('@/views/permission/role'),
      name: 'RolePermission',
      meta: {
        title: '员工权限1',
        roles: ['admin']
      }
    }
  ]
}

export default permissionRouter
