<template>
  <div class="login">
    <loginPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginPanel from './login-panel.vue'

// defineComponent最后导出的都是DefineComponent实例component
export default defineComponent({
  components: {
    loginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
