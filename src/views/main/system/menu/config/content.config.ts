import { Itable } from '@/base-ui/table/src/type'

export const tableContentConfig: Itable = {
  title: '菜单列表',

  // 创建表头配置文件,根据el-table来设置
  tableContentProps: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '100' },
    { prop: 'url', label: '菜单url', minWidth: '100' },
    { prop: 'icon', label: '图标', minWidth: '100' },
    { prop: 'permission', label: '权限', minWidth: '120' },
    { prop: 'createAt', label: '创建时间', minWidth: '200', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '200', slotName: 'updateAt' },
    { prop: 'options', label: '操作', minWidth: '110', slotName: 'options' }
  ],
  isShowIndex: false,
  isShowSelect: false,
  isShowPagination: false,
  // 看后端回来的数据格式
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
}
