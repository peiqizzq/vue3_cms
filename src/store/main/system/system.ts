import { IrootState } from '@/store/type'
import { Module } from 'vuex'
import { IsystemState } from './type'
import {
  creataPagedataReq,
  deletePagedataReq,
  editPagedataReq,
  getPageListReq
} from '@/service/main/system/system'

const systemModule: Module<IsystemState, IrootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageList(state) {
      // 可以把store转成any这样就能用state[`${}List`]直接拿到对应数据,或者用switch
      return (pageName: string) => (state as any)[`${pageName}List`]
    },
    pageListCount(state) {
      return (pageName: string) => (state as any)[`${pageName}Count`]
      // return (pageName: string) => {
      //   switch (pageName) {
      //     case 'user':
      //       return state.userCount
      //     case 'role':
      //       return state.roleCount
      //     default:
      //       break
      //   }
      // }
    }
  },
  mutations: {
    changeUsersList(state, list: any[]) {
      state.usersList = list
    },
    changeUsersCount(state, Count: number) {
      state.usersCount = Count
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, Count: number) {
      state.roleCount = Count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, Count: number) {
      state.goodsCount = Count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, Count: number) {
      state.menuCount = Count
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 根据页面获取url
      let pageName: string = payload.pageName
      const pageUrl = `/${pageName}/list`

      // 发送网络请求
      const pageResult = await getPageListReq(pageUrl, payload.queryInfo)
      console.log('system.ts', pageResult)

      // 拿到list和totalCount，做commit保存
      pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1)
      const { list, totalCount } = pageResult.data
      commit(`change${pageName}List`, list)
      commit(`change${pageName}Count`, totalCount)
    },
    // 删除按钮操作
    async deletePagedataAction({ dispatch }, payload) {
      const { pageName, id } = payload
      const pageUrl = `${pageName}/${id}`
      await deletePagedataReq(pageUrl)
      // 重新请求数据刷新删除之后的页面
      dispatch('getPageListAction', {
        pageName,
        // 这里的偏移数据应该是根据上面的search来设置的，可以把search和content的信息都放到vuex中去共享
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 新增按钮操作
    async createPagedataAction({ dispatch }, payload) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      // console.log('createPagedataAction', payload.newData)
      await creataPagedataReq(pageUrl, newData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 编辑按钮操作
    async editPagedataAction({ dispatch }, payload) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPagedataReq(pageUrl, editData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
