<template>
  <!-- 这里classname不能写main，会崩 -->
  <div class="chat">
    <h2>main</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // 这里main本身就是一个html标签 <main><main/>,会报重名警告
  name: 'chat',
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
