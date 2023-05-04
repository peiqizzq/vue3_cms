<template>
  <div class="login-phone">
    <ElForm :model="phone" :rules="rulesPhone" ref="checkRef">
      <ElFormItem label="手机号" prop="num">
        <ElInput v-model="phone.num"></ElInput>
      </ElFormItem>
      <ElFormItem label="验证码" prop="code">
        <div class="phone-code">
          <ElInput v-model="phone.code"></ElInput>
          <ElButton type="primary" class="codebtn">获取验证码</ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rulesPhone } from './config/login-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })
    const store = useStore()
    const checkRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = () => {
      console.log('login action')
      checkRef.value?.validate((valid) => {
        if (valid) {
          console.log('pass')
          store.dispatch('login/phoneLoginAction', { ...phone })
        }
      })
    }
    return {
      phone,
      checkRef,
      rulesPhone,
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.phone-code {
  display: flex;
}
.codebtn {
  flex: 1;
  margin-left: 5px;
}
</style>
