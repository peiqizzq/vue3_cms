import { Iform } from '@/base-ui/form'

export const searchFormConfig: Iform = {
  formItems: [
    {
      field: 'id',
      itemType: 'el-input',
      label: 'ID',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      itemType: 'el-input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      itemType: 'el-input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      itemType: 'el-input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'enable',
      itemType: 'el-select',
      label: '状态',
      placeholder: '选择用户状态',
      options: [
        {
          title: '启用',
          value: 1
        },
        {
          title: '禁用',
          value: 0
        }
      ]
    },
    {
      field: 'createAt',
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
