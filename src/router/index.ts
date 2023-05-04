import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
// 导入前面加type，告诉ts这个就是类型，不是什么别的
import type { RouteRecordRaw } from 'vue-router'
import Login from '../views/logins/Login.vue'
import localcache from '../utils/cache'
import { defaultActiveUrl } from '@/utils/map-menus'

// ！！！
// 通过router.addRoute('parent',route)动态添加的路由，无法在打印的children里面看到，只有写在children里面写死的才能在打印
// 但是vue devtools可以看到
// 在一级路由下添加二级路由，不要包含一级路由的名称。例如在main路由下又添加moment/main的main模块。
// 因为，不注意就会把两个路径的name都设置成main，会直接把一级main覆盖掉，或者查不到。
// 写二级路由的路径要加上一级路由的前缀/login，/login/xxx

// 用户进入应该是到首页，用路由守卫跳到登陆页面Array<RouteRecordRaw>
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
    // !TEST
    // children: [
    //   {
    //     path: '/login/none',
    //     name: 'none',
    //     component: () => import('../views/not-found/not-found.vue')
    //   }
    // ]
  },
  {
    path: '/main',
    name: 'main',
    // 懒加载路由
    component: () => import(/* webpackChunkName: "about" */ '../views/main/main.vue')
    // children: []
  },
  // 测试
  {
    path: '/test',
    name: 'test',
    // 懒加载路由
    component: () => import(/* webpackChunkName: "about" */ '../views/test.vue'),
    children: [
      {
        path: '/test/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      }
    ]
  },
  // not found页面
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('../views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// !TEST
// router.addRoute('login', {
//   path: '/login/none',
//   name: 'none',
//   component: () => import('../views/not-found/not-found.vue')
// })

// 路由守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localcache.getCache('token')
    if (!token) {
      return '/login'
    }
  }

  // console.log(router.getRoutes())
  // console.log(to)

  // 这里只对进入/main首页进行限制，进入/main/system/user等都是不限制的，因为url不同
  if (to.path === '/main') {
    return defaultActiveUrl
  }
})

export default router
