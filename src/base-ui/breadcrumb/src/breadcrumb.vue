<template>
  <div class="z2qbreadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="crumb in breadcrumbs" :key="crumb.name">
        <!-- 不需要跳转功能 -->
        <el-breadcrumb-item :to="{ path: '#' }">{{ crumb.name }}</el-breadcrumb-item>
      </template>
      <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item> -->
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { Ibreadcrumb } from './type'

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<Ibreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
