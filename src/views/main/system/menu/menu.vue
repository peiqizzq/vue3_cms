<template>
  <div class="menu">
    <pageContent :tableContentConfig="tableContentConfig" pageName="menu"></pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageContent from '@/components/page-content'
import { tableContentConfig } from './config/content.config'

export default defineComponent({
  // 这里menu本身就是一个html标签 <menu><menu/>,会报重名警告
  name: 'usermenu',
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
