// 表单校验规则
export const rulesAccount = {
  name: [
    {
      required: true,
      message: '用户名必填',
      trigger: 'blur' // 失去焦点开始验证，change：改变时验证
    },
    {
      pattern: /^[0-9a-zA-Z]{4,15}$/,
      message: '用户名为4-15个字符',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码必填',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9a-zA-Z]{6,}$/,
      message: '密码长度6位以上',
      trigger: 'blur'
    }
  ]
}
export const rulesPhone = {
  num: [
    {
      required: true,
      message: '手机号必填',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{11}$/,
      message: '输入11位手机号',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码必填',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9a-zA-Z]{6}$/,
      message: '请输入6位验证码',
      trigger: 'blur'
    }
  ]
}
