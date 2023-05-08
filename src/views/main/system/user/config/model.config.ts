import { Iform } from '@/base-ui/form'

export const modelConfig: Iform = {
  formItems: [
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
      field: 'password',
      itemType: 'el-input',
      label: '密码',
      placeholder: '请输入密码',
      otherOptions: {
        type: 'password',
        showPassword: true
      },
      isHidden: true
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
      field: 'roleId',
      itemType: 'el-select',
      label: '角色',
      placeholder: '选择角色',
      options: []
    },
    {
      field: 'departmentId',
      itemType: 'el-select',
      label: '部门',
      placeholder: '选择部门',
      options: []
    }
  ],
  labelWidth: '75px',
  itemStyle: { padding: '0 20px' },
  colLayout: { span: 24 }
}
