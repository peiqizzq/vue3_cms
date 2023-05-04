<template>
  <div class="app">
    <!-- 国际化需要直接从element-plus路径引用组件，不能加/lib/index -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
{
  // 传不传泛型都能使用
  // import z2qios from './service'
  // z2qios
  //   .post({
  //     url: '/post',
  //     data: {
  //       name: 'anduy',
  //       age: 38
  //     }
  //   })
  //   .then((res) => {
  //     console.log(res)
  //   })
}
export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup() {
    return {
      zhCn
    }
  }
})
</script>

<style scoped>
.app {
  height: 100%;
}
</style>
