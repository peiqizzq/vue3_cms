<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="40"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          style="margin-right: 5px"
        />
        {{ username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item divided>系统管理</el-dropdown-item>
          <el-dropdown-item divided @click="handleExit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const username = computed(() => store.state.login.userInfo.name)

    const router = useRouter()
    const handleExit = () => {
      localCache.removeCache('token') // 也可以把其他的全部都删除
      router.push('/main')
    }
    return {
      username,
      handleExit
    }
  }
})
</script>

<style scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;
}
</style>
