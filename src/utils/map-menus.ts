import { Ibreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

// 保存main里面激活的菜单的url
let defaultActiveUrl: string
// 映射组件和url
export function mapMenus(userMenus: any[]): RouteRecordRaw[] {
  // 1.先加载全部的路由
  const allRoutes: RouteRecordRaw[] = []
  // 利用webpack的工具require导入文件夹,文件的相对路径。true表示递归查找
  const allRouteFiles = require.context('@/router/main', true, /\.ts/)
  allRouteFiles.keys().forEach((key) => {
    // 利用js的require导入文件
    // @typescript-eslint/no-var-requires是TypeScript的一个lint规则，用于检查代码中是否存在使用require()语句导入模块的情况。这个规则的作用是为了鼓励开发者在使用模块的时候，使用import语句来代替require()语句。
    const route = require('@/router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  {
    // // 两种导入并拿到模块对象的方法
    // // import召唤模块
    // import('@/router/main/analysis/dashboard/dashboard').then((res) => {
    //   console.log(res.default)
    // })
    // console.log('-----------------------------------')
    // // require召唤模块
    // const route2 = require('@/router/main/analysis/dashboard/dashboard')
    // console.log(route2.default)
  }

  // 2.根据用户menus得到对应的routes数组
  const userMenu: RouteRecordRaw[] = []
  // 通过递归去解决children菜单的问题
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        if (!defaultActiveUrl) {
          defaultActiveUrl = menu.url
        }
        const route = allRoutes.find((route) => menu.url === route.path)
        if (route) {
          userMenu.push(route)
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return userMenu
}
export { defaultActiveUrl }

// 也可以用el-menu的router属性配合url做index来实现
// 根据当前的url找到组件，并设置active的菜单
export function routeMapMenuId(
  userMenus: any[],
  routePath: string,
  breadcrumbs?: Ibreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      // 不能直接return，这样就不会继续往下找type=2了（比如usermenus的id序列为1，2，2，2）
      const itemId = routeMapMenuId(menu.children ?? [], routePath)
      if (itemId) {
        breadcrumbs?.push({ name: menu.name, path: menu.url })
        breadcrumbs?.push({ name: itemId.name, path: itemId.url })
        // 返string。return id
        return itemId
      }
    } else if (menu.type === 2 && menu.url === routePath) {
      // 返string。 return menu.id + ''
      return menu
    }
  }
  // 返string。空字符串也是false，避免递归出来空值进if->return
  // return ''
}

// 可以抽离但是不好
export function routeMapMenuBreadcrumb(userMenus: any[], routePath: string): Ibreadcrumb[] {
  const breadcrumbs: Ibreadcrumb[] = []
  routeMapMenuId(userMenus, routePath, breadcrumbs)
  return breadcrumbs
}

// 根据菜单拿到权限
export function menuMapPermission(userMenus: any[]) {
  const permission: string[] = []
  const _getPermission = (menus: any[]) => {
    for (const item of menus) {
      if (item.type === 3) {
        permission.push(item.permission)
      } else {
        _getPermission(item.children ?? [])
      }
    }
  }
  _getPermission(userMenus)
  return permission
}
