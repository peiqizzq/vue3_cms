import { Itable } from '@/base-ui/table/src/type'

export const tableContentConfig: Itable = {
  title: '角色列表',

  // 创建表头配置文件,根据el-table来设置
  tableContentProps: [
    { prop: 'name', label: '角色', minWidth: '100' },
    { prop: 'intro', label: '介绍', minWidth: '100' },
    { prop: 'createAt', label: '创建时间', minWidth: '200', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '200', slotName: 'updateAt' },
    { prop: 'options', label: '操作', minWidth: '110', slotName: 'options' }
  ],
  isShowIndex: true,
  isShowSelect: true
}
