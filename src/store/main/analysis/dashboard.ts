import { Module } from 'vuex'
import { IdashboardState } from './type'
import { IrootState } from '@/store/type'
import {
  getGoodsAddressSale,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IdashboardState, IrootState> = {
  namespaced: true,
  state() {
    return {
      goodsCategoryCount: [],
      goodsCategorySale: [],
      goodsCategoryFavor: [],
      goodsAddressSale: []
    }
  },
  mutations: {
    changeGoodsCategoryCount(state, list: any[]) {
      state.goodsCategoryCount = list
    },
    changeGoodsCategorySale(state, list: any[]) {
      state.goodsCategorySale = list
    },
    changeGoodsCategoryFavor(state, list: any[]) {
      state.goodsCategoryFavor = list
    },
    changeGoodsAddressSale(state, list: any[]) {
      state.goodsAddressSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const goodsCategoryCountRes = await getGoodsCategoryCount()
      commit('changeGoodsCategoryCount', goodsCategoryCountRes.data)
      const goodsCategorySaleRes = await getGoodsCategorySale()
      commit('changeGoodsCategorySale', goodsCategorySaleRes.data)
      const goodsCategoryFavorRes = await getGoodsCategoryFavor()
      commit('changeGoodsCategoryFavor', goodsCategoryFavorRes.data)
      const goodsAddressSaleRes = await getGoodsAddressSale()
      commit('changeGoodsAddressSale', goodsAddressSaleRes.data)
    }
  }
}

export default dashboardModule
