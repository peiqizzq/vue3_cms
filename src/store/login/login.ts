// 通过ts的方式创建模块，使用vuex的Module，需要两个泛型，1是本模块的泛型，2是根模块的泛型。js中直接写对象就行
import { Module } from 'vuex'

import { IrootState } from '../type'
import { IloginState } from './type'
import { accountLoginReq, userInfoByIdReq, userMenusByRoleIdReq } from '@/service/login/login'
import { Iaccount } from '@/service/login/type'
import localcache from '@/utils/cache'
import router from '@/router'
import { mapMenus, menuMapPermission } from '@/utils/map-menus'

const loginModule: Module<IloginState, IrootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      userPermissions: []
    }
  },
  mutations: {
    changeToken(state, token) {
      state.token = token
    },
    changeUserInfo(state, userinfo) {
      state.userInfo = userinfo
    },
    changeUserMenus(state, usermenus) {
      state.userMenus = usermenus

      // 动态注册路由
      const menusRoute = mapMenus(usermenus)
      menusRoute.forEach((route) => {
        router.addRoute('main', route)
      })
      // console.log(menusRoute, router.getRoutes())

      // 获取用户权限
      state.userPermissions = menuMapPermission(usermenus)
      // console.log(state.userPermission)
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: Iaccount) {
      // 给账户登录接入request请求,在异步中通过await同步(防止因为使用then而回调过多和回调嵌套)
      const loginResult = await accountLoginReq(payload)
      const { id, token } = loginResult.data
      // console.log(loginResult)

      // 通过mutation保存token
      commit('changeToken', token)
      // 本地保存token
      localcache.setCache('token', token)
      // localcache.setCache('token', 'peiqi')

      // 获取用户信息。在有token的情况下，登录就跳转到用户界面，所以用户信息也要缓存
      const userInfoResult = await userInfoByIdReq(id)
      const uesrInfo = userInfoResult.data
      commit('changeUserInfo', uesrInfo)
      localcache.setCache('userinfo', uesrInfo)

      // 根据用户显示菜单 1.?创建数据类型和枚举api，2.编写对应请求，3.编写action，4.编写mutation
      const userMenusResult = await userMenusByRoleIdReq(uesrInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localcache.setCache('usermenus', userMenus)

      // 跳转首页
      router.push('/main')
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log(payload)
    },
    // 对刷新，路径进入等操作进行数据恢复
    loadLocalLogin({ commit }) {
      const token = localcache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localcache.getCache('userinfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localcache.getCache('usermenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}
export default loginModule
