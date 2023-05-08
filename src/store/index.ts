import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IrootState, IstoreType } from './type'

// 导入login模块注册
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { getPageListReq } from '@/service/main/system/system'

const store = createStore<IrootState>({
  state() {
    return {
      name: '',
      age: 0,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list: any[]) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list: any[]) {
      state.entireRole = list
    },
    changeEntireMenu(state, list: any[]) {
      state.entireMenu = list
    }
  },
  actions: {
    // 初始化，获得完整的部门列表和角色列表,菜单列表
    async getInitial({ commit }) {
      const department = await getPageListReq('/department/list', {
        offset: 0,
        size: 1000
      })
      // es6语法,起别名，相当于as
      const { list: entireDepartment } = department.data
      commit('changeEntireDepartment', entireDepartment)

      const role = await getPageListReq('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: entireRole } = role.data
      commit('changeEntireRole', entireRole)

      const menu = await getPageListReq('/menu/list', {})
      const { list: entireMenu } = menu.data
      commit('changeEntireMenu', entireMenu)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})
// 对刷新，路径进入等操作进行数据恢复,page路由之间点击跳转不会触发
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // 异步操作，这里有可能出现token还没拿到就请求数据，不合适，放到确保token拿到的地方去
  // store.dispatch('getInitial')
}

// 自己定义一个返回带有特定类型(使用子模块)的Store
export function useStore(): Store<IstoreType> {
  return useVuexStore()
}

export default store
