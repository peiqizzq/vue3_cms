import { Iform } from '@/base-ui/form'

export const modelConfig: Iform = {
  formItems: [
    {
      field: 'name',
      itemType: 'el-input',
      label: '角色',
      placeholder: '请输入角色'
    },
    {
      field: 'intro',
      itemType: 'el-input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  labelWidth: '75px',
  itemStyle: { padding: '0 20px' },
  colLayout: { span: 24 }
}
