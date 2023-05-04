export interface Iaccount {
  name: string
  password: string
}
export enum LoginApi {
  accountLogin = '/login',
  userInfo = '/users/',
  userMenus = '/role/',
  post = '/post'
}
// 登录返回的数据
export interface IloginData {
  id: number
  name: string
  token: string
}
