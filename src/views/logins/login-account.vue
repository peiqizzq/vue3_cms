<template>
  <div class="login-account">
    <!-- 对表单绑定验证规则和数据，并给每个item对应规则 -->
    <ElForm :rules="rulesAccount" :model="account" ref="checkRef">
      <ElFormItem label="账号" prop="name">
        <ElInput v-model="account.name"></ElInput>
      </ElFormItem>
      <ElFormItem label="密码" prop="password">
        <ElInput v-model="account.password" show-password></ElInput>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

// 编写对应得表单验证规则，https://github.com/yiminghe/async-validator
// 可以给单独的item写规则，也可以给整个表单写规则。给表单写规则的时候，给每个对应的item一个prop，值为rules里面验证的key
import { rulesAccount } from './config/login-config'
// 给form表单添加ref，拿到值做验证
import type { ElForm } from 'element-plus'
// 使用本地储存工具
import localCache from '@/utils/cache'
// 导入store进行数据管理
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    // 拿到store
    const store = useStore()
    // 拿到表单的ref做值验证
    const checkRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isRememberpwd: boolean) => {
      console.log('login action')
      checkRef.value?.validate((valid) => {
        if (valid) {
          console.log('pass valid')
          // 1.是否存储密码。messageStorage，页面关闭就丢失；localStorage，刷新还在
          if (isRememberpwd) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.removeCache('name')
            localCache.removeCache('password')
          }
          // 2.登录。登录的其他逻辑不适合放在这里，这里就存储一下
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
    return {
      account,
      rulesAccount,
      loginAction,
      checkRef
    }
  }
})
</script>

<style scoped></style>
