import z2qios from '@/service'
import { IdataType } from '@/service/type'
import { IlistData, dashApi } from './type'

export function getGoodsCategoryCount() {
  return z2qios.get<IdataType<IlistData>>({
    url: dashApi.goodsCategoryCount,
    isShowLoading: false
  })
}
export function getGoodsCategorySale() {
  return z2qios.get<IdataType<IlistData>>({
    url: dashApi.goodsCategorySale,
    isShowLoading: false
  })
}
export function getGoodsCategoryFavor() {
  return z2qios.get<IdataType<IlistData>>({
    url: dashApi.goodsCategoryFavor,
    isShowLoading: false
  })
}
export function getGoodsAddressSale() {
  return z2qios.get<IdataType<IlistData>>({
    url: dashApi.goodsAddressSale,
    isShowLoading: false
  })
}
