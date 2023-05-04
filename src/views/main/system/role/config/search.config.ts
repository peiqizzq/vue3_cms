import { Iform } from '@/base-ui/form'

export const searchFormConfig: Iform = {
  formItems: [
    {
      field: 'name',
      itemType: 'el-input',
      label: '角色',
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      itemType: 'el-input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    },
    {
      field: 'dateRange',
      itemType: 'el-date-picker',
      label: '日期',
      placeholder: '范围',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '75px'
  // itemStyle: {}
  // colLayout: {}
}
