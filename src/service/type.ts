// 可以根据具体返回的数据结构去定义数据类型,用泛型来暂定
export interface IdataType<T = any> {
  code: number
  data: T
}
