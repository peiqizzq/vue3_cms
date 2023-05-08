import { IloginState } from './login/type'
import { IdashboardState } from './main/analysis/type'
import { IsystemState } from './main/system/type'
export interface IrootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}
// 后面有子模块都加在这里
export interface IrootWithModule {
  login: IloginState
  system: IsystemState
  dashboard: IdashboardState
}

export type IstoreType = IrootState & IrootWithModule
