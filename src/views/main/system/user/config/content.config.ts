import { Itable } from '@/base-ui/table/src/type'

export const tableContentConfig: Itable = {
  title: '用户列表',

  // 创建表头配置文件,根据el-table来设置
  tableContentProps: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '真实姓名', minWidth: '100' },
    { prop: 'cellphone', label: '电话号码', minWidth: '100' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'createAt', label: '创建时间', minWidth: '200', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '200', slotName: 'updateAt' },
    { prop: 'options', label: '操作', minWidth: '110', slotName: 'options' }
  ],
  isShowIndex: true,
  isShowSelect: true
}
