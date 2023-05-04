// shims电线的意思
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
  // 相当于.vue导出的都是一个一个component对象描述，使用的时候通过描述创建一个一个实例

  // 这里报错是volar的检测，volar对TS的检测更加严格，script里面没声明的模板里不能使用，其实是store已经注入了的
  // 使用$store,$filters
  import { ComponentCustomProperties } from 'vue'
  import { Store } from 'vuex'
  declare module '@vue/runtime-core' {
    // declare your own store states
    // type State = S

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
      $store: Store<State>
      $filters: any
    }
  }
}
declare module 'element-plus/dist/locale/zh-cn.mjs'
// declare let $store:any
