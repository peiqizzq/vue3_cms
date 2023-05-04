<template>
  <div>
    <h2>{{ $store.state.name }}</h2>
    <!-- 这里$store报错是volar的检测，volar对TS的检测更加严格，script里面没声明的模板里不能使用，其实是store已经注入了的 -->
    <!-- 去shims-vue.d.ts里面声明$store就行了。问题未解决 -->
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view></router-view>

    <!-- 已经在main.ts中做了全局注册，如果在下面注册是按需注册 -->
    <el-button>hahahah</el-button>
    <el-button type="danger">hahahah</el-button>
    <el-button type="primary">hahahah</el-button>

    <el-input></el-input>
    <img src="./assets/img/axios1.png" width="800" />
    <img src="./assets/img/axios2.png" width="800" />
    <img src="./assets/img/axios3.png" width="800" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
// import { ElButton } from 'element-plus'
// 直接引用所有的样式
// import 'element-plus/theme-chalk/index.css'
// 按需引用样式
// import 'element-plus/theme-chalk/base.css'
// import 'element-plus/theme-chalk/el-button.css'

// 可以借助babel的插件(去babel的配置文件中配置)，npm babel-plugin-import -D自动引入插件对应的样式，同时把base.css等基础样式或图标全局引用
// 可以直接创建global文件夹，把一些全局的操作都放里面，去里面全局注册组件。

// console.log(process.env.VUE_APP_BASE_NAME)

// 可以用自己的res数据的类型
type DataT = {
  data: any
  returnCode: string
  success: boolean
}

// 使用自己封装的z2qios
import z2qios from './service/index'
z2qios
  .request<DataT>({
    url: '/home/multidata',
    method: 'GET',
    interceptors: {
      requestInterceptor(config) {
        console.log('单请求拦截')
        return config
      },
      responseInterceptor(res) {
        console.log('单响应拦截')
        return res
      }
    },
    isShowLoading: true
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })

// defineComponent最后导出的都是DefineComponent实例component
export default defineComponent({
  components: {
    // ElButton
  }
})
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
