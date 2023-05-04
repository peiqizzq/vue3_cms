// es6的语法，导出变量时必须在声明就导出，不允许先声明再赋值再导出；或者操作完后放到对象里面导出
// 修改环境变量
// 1.手动修改
// 2.根据process.env.NODE_ENV区分 使用较多
// let BASE_URL = ''
// let BASE_NAME = ''

// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = '/dev'
//   BASE_NAME = 'dev'
// } else if (process.env.NODE_ENV === 'production') {
//   BASE_URL = '/prod'
//   BASE_NAME = 'prod'
// } else {
//   BASE_URL = '/test'
//   BASE_NAME = 'test'
// }
let BASE_URL = ''
const TIMT_OUT = 5000

if (process.env.NODE_ENV === 'development') {
  // BASE_URL = 'http://123.207.32.32:8000/'
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '/prod'
} else {
  BASE_URL = '/test'
}

export { BASE_URL, TIMT_OUT }

// 3. cli支持。创建.env的文件。可以去cli官网搜环境变量
// 去创建.env文件是全局的，在后面加上.development、.production、.test来分环境
// 通过process.env.xxx来获取
