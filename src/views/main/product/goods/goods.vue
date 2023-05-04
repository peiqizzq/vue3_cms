<template>
  <div class="goods">
    <pageContent :tableContentConfig="tableContentConfig" pageName="goods">
      <template #oldPrice="scope">
        {{ '￥' + scope.row.oldPrice }}
      </template>
      <template #newPrice="scope">
        {{ '￥' + scope.row.newPrice }}
      </template>
      <template #image="scope">
        <!-- preview-src-list属性是左右翻图片 -->
        <el-image
          style="width: 60px; height: 80px"
          :preview-src-list="[scope.row.imgUrl]"
          :src="scope.row.imgUrl"
        ></el-image>
      </template>
      <!-- 不使用默认的状态插槽，用自己的 -->
      <template #status="scope">
        <ElButton plain size="small" :type="scope.row.enable === 1 ? 'success' : 'danger'">{{
          scope.row.enable === 1 ? '上架' : '下架'
        }}</ElButton>
      </template>
    </pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { tableContentConfig } from './config/content.config'
import pageContent from '@/components/page-content'

export default defineComponent({
  name: 'goods',
  components: {
    pageContent
  },
  setup() {
    return {
      tableContentConfig
    }
  }
})
</script>

<style scoped></style>
