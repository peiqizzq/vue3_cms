import axios from 'axios'
import { AxiosInstance } from 'axios'
import { ElLoading } from 'element-plus'
// 这里出现两个问题，分别是create和use-fun1的类型从AxiosRequestConfig变成了CreateAxiosDefaults和InternalAxiosRequestConfig

// 类的封装性更强
// 单实例拦截器功能梳理。创建自己的拦截器接口，创建自己的config接口类型继承AxiosRequestConfig(现在是CreateAxiosDefaults，它也是继承自AxiosRequestConfig)。
// 增加自己的拦截器属性；在构造器初始化的时候，把拦截器属性传给实例instance的对应拦截器use

// 封装到type.ts中
import {
  Z2QRequestInterceptors,
  Z2QRequestConfig,
  // Z2QRequestInterceptorsOld,// 在请求中直接用Z2QRequestConfigOld了
  Z2QRequestConfigOld
} from './type'
// 创建拦截器接口。(InternalAxiosRequestConfig也是继承自AxiosRequestConfig)
// 在开发中，interface和type都可以拆到type.ts文件中去
// interface Z2QRequestInterceptors {
//   requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig // 可以参考axios的拦截器的use的用法，传入的函数也是返回config。(value: V) => V。
//   // 实际的拦截执行就是在(config)=> {}中执行(外部传进来)，这里只是定义参数和返回值，接口。
//   requestInterceptorCatch?: (err: any) => any
//   // 满足下面传递resolve参数，暂时用any
//   // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
//   responseInterceptor?: (res: any) => any
//   responseInterceptorCatch?: (err: any) => any
// }
// interface Z2QRequestConfig extends CreateAxiosDefaults {
//   interceptors?: Z2QRequestInterceptors
//   isShowLoading?: boolean
// }
// 为单请求拦截创建旧版的类型
// interface Z2QRequestInterceptorsOld {
//   requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig // 可以参考axios的拦截器的use的用法，传入的函数也是返回config。(value: V) => V。
//   // 实际的拦截执行就是在(config)=> {}中执行(外部传进来)，这里只是定义参数和返回值，接口。
//   requestInterceptorCatch?: (err: any) => any
//   // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
//   responseInterceptor?: (res: any) => any
//   responseInterceptorCatch?: (err: any) => any
// }
// interface Z2QRequestConfigOld extends AxiosRequestConfig {
//   interceptors?: Z2QRequestInterceptorsOld
//   isShowLoading?: boolean
// }

const DeafultLoading = false

class Z2QRequest {
  instance: AxiosInstance
  interceptors?: Z2QRequestInterceptors
  loading?: any
  isShowLoading: boolean

  constructor(config?: Z2QRequestConfig) {
    this.instance = axios.create(config)
    this.isShowLoading = config?.isShowLoading ?? DeafultLoading
    this.interceptors = config?.interceptors
    // 真正初始化axios的拦截器
    // 单个实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全部实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求拦截 空载')
        // 请求开始，添加loding
        if (this.isShowLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求中',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    // 根据不同情况选择在实例或者全局添加错误信息处理
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局响应拦截 空载')
        // 请求完成，关闭loading。1s显示效果
        setTimeout(() => {
          this.loading?.close()
        }, 1000)
        // 服务器200，自己报错。观察返回数据，发现请求失败的时候，服务器返回的数据是AxiosError类型。
        // 返回数据在res.response.data中
        // console.log('request/index.ts', res)
        if (!res.data) {
          console.log('Atttion! 请求失败', (res as any).response.data)
        } else {
          return res.data
        }
      },
      (err) => {
        // 浏览器状态码，可以用swtich
        // 请求完成，关闭loading
        setTimeout(() => {
          this.loading?.close()
        }, 1000)
        if (err.response.status === 404) {
          console.log('404')
        }
        console.log('request/index/reqRes', err)
        return err
      }
    )
  }

  // 不传泛型的话，返回的res是unknown类型
  // 封装request请求，增加单个请求的响应拦截。将结果放到Promise中，并传入泛型T，这样就可以在请求时根据服务器的返回获取自己想要的数据的类型
  request<T = any>(config: Z2QRequestConfigOld<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        // 因为requestInterceptor函数中可以对config进行一些操作。按道理是传递给use，让use去执行，这里直接自己执行达到单个请求拦截的效果
        config = config.interceptors.requestInterceptor(config)
        // 这里出现两个问题，分别是create和use-fun1的类型从AxiosRequestConfig变成了CreateAxiosDefaults和InternalAxiosRequestConfig
      }
      // 对单请求进行loading进行设置，这里修改了实例的值，所以要在下面把值设置成原来的值，包括本次请求的catch。不传值是undefined，undefined也是false
      if (config.isShowLoading ?? DeafultLoading) {
        // 这里的??操作可以去掉
        this.isShowLoading = true
      }
      this.instance
        .request<any, T>(config) // 上面的拦截器里面处理过data，所以.request的返回(res)类型不是AxiosResponse，推导错误了,手动改成T
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 恢复isShowLoading的值
          this.isShowLoading = DeafultLoading
          resolve(res)
          // console.log(res)
        })
        .catch((err) => {
          this.isShowLoading = DeafultLoading
          reject(err)
          return err
        })
    })
  }

  // 通过request封装get，post等
  get<T = any>(config: Z2QRequestConfigOld<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: Z2QRequestConfigOld<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: Z2QRequestConfigOld<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: Z2QRequestConfigOld<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Z2QRequest
