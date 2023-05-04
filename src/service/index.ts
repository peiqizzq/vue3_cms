// service统一的出口
import Z2QRequest from './request'
// 导入环境变量
import { BASE_URL, TIMT_OUT } from './request/config'
import localcache from '@/utils/cache'
// 如果开发中要求有多个request的时候，最好创建多个request实例，每个实例相互独立。通过Z2QRequest的构造器实现
// 创建request实例，封装拦截器，这样不同的request可以有不同的拦截功能
const z2qios = new Z2QRequest({
  baseURL: BASE_URL,
  timeout: TIMT_OUT,
  interceptors: {
    requestInterceptor(config) {
      // 根据不同的情况选择在实例中或者全局拦截添加token
      const token = localcache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('实例请求拦截 空载')
      return config
    },
    requestInterceptorCatch(err) {
      return err
    },
    responseInterceptor(res) {
      console.log('实例响应拦截 空载')
      return res
    },
    responseInterceptorCatch(err) {
      return err
    }
  }
})
export default z2qios
