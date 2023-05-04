import z2qios from '../'
import { Iaccount, IloginData, LoginApi } from './type'
import { IdataType } from '@/service/type'

// 把类型和枚举等定义都抽到type里面去
export function accountLoginReq(account: Iaccount) {
  return z2qios.post<IdataType<IloginData>>({
    url: LoginApi.accountLogin,
    data: account
  })
}
export function userInfoByIdReq(id: number) {
  return z2qios.get<IdataType>({
    url: LoginApi.userInfo + id,
    isShowLoading: false
  })
}
export function userMenusByRoleIdReq(roleId: number) {
  return z2qios.get<IdataType>({
    url: LoginApi.userMenus + roleId + '/menu',
    isShowLoading: false
  })
}
