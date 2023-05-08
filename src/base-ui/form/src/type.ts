export type IformType =
  | 'el-input'
  | 'el-checkbox'
  | 'el-password'
  | 'el-select'
  | 'el-option'
  | 'el-date-picker'

export interface IoptionType {
  title: string | number
  value: string | number | boolean
}

export interface IformItem {
  // field用来做数据绑定的，传的值必须和props定义的名称一样
  field: string
  itemType: IformType
  label?: string
  showPassword?: boolean
  rules?: any
  placeholder?: any
  // 状态按钮
  options?: IoptionType[]
  // 其他输入框配置，如时间，输入类型为password等
  otherOptions?: object
  // 是否隐藏本项。像这种单独的功能，可以放到otherOptions中去，根据对应组件的属性来设置想要的效果
  isHidden?: boolean
}

export interface Iform {
  formItems: IformItem[]
  labelWidth?: string
  itemStyle?: object
  colLayout?: object
}
