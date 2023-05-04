import {
  CreateAxiosDefaults,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

export interface Z2QRequestInterceptors<R = AxiosResponse> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig // 可以参考axios的拦截器的use的用法，传入的函数也是返回config。(value: V) => V。
  // 实际的拦截执行就是在(config)=> {}中执行(外部传进来)，这里只是定义参数和返回值，接口。
  requestInterceptorCatch?: (err: any) => any
  // 满足下面传递指定类型的resolve参数，这里用模板代替类型
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptor?: (res: R) => R
  responseInterceptorCatch?: (err: any) => any
}
export interface Z2QRequestConfig<R = AxiosResponse> extends CreateAxiosDefaults {
  interceptors?: Z2QRequestInterceptors<R>
  isShowLoading?: boolean
}

export interface Z2QRequestInterceptorsOld<R = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig // 可以参考axios的拦截器的use的用法，传入的函数也是返回config。(value: V) => V。
  // 实际的拦截执行就是在(config)=> {}中执行(外部传进来)，这里只是定义参数和返回值，接口。
  requestInterceptorCatch?: (err: any) => any
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptor?: (res: R) => R
  responseInterceptorCatch?: (err: any) => any
}
export interface Z2QRequestConfigOld<R = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: Z2QRequestInterceptorsOld<R>
  isShowLoading?: boolean
}
