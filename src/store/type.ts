import { IloginState } from './login/type'
import { IsystemState } from './main/system/type'
export interface IrootState {
  name: string
  age: number
}
// 后面有子模块都加在这里
export interface IrootWithModule {
  login: IloginState
  system: IsystemState
}

export type IstoreType = IrootState & IrootWithModule
