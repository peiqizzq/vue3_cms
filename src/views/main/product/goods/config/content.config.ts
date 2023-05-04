import { Itable } from '@/base-ui/table/src/type'

export const tableContentConfig: Itable = {
  title: '商品列表',

  // 创建表头配置文件,根据el-table来设置
  tableContentProps: [
    { prop: 'name', label: '商品名称', minWidth: '100' },
    { prop: 'oldPrice', label: '原价', minWidth: '100', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价', minWidth: '100', slotName: 'newPrice' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'createAt', label: '创建时间', minWidth: '200', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '200', slotName: 'updateAt' },
    { prop: 'options', label: '操作', minWidth: '110', slotName: 'options' }
  ],
  isShowIndex: true,
  isShowSelect: true
}
