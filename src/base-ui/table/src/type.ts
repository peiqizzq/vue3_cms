export interface ItableProp {
  prop: string
  label: string
  minWidth: string
  slotName?: string
}

// 内容和z2qtable组件里面的props对应
export interface Itable {
  title?: string
  titleBtn?: string
  tableContentProps: ItableProp[]
  isShowIndex?: boolean
  isShowSelect?: boolean
  isShowPagination?: boolean
  // 为菜单列表设置的
  childrenProps?: { rowKey: string; treeProp: object }
}
