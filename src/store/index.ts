import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IrootState, IstoreType } from './type'

// 导入login模块注册
import login from './login/login'
import system from './main/system/system'

const store = createStore<IrootState>({
  state() {
    return {
      name: '',
      age: 0
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    system
  }
})
// 对刷新，路径进入等操作进行数据恢复
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 自己定义一个返回带有特定类型(使用子模块)的Store
export function useStore(): Store<IstoreType> {
  return useVuexStore()
}

export default store
