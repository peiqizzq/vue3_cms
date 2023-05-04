<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <ElTabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <ElTabPane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <!-- <User style="width: 1em; height: 1em; margin-right: 5px" /> -->
            <ElIcon style="vertical-align: middle; margin-right: 5px"><User /></ElIcon>
            <span style="vertical-align: middle">账号登录</span>
          </span>
        </template>
        <loginAccount ref="accountRef" />
      </ElTabPane>
      <ElTabPane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <!-- <Iphone style="width: 1em; height: 1em; margin-right: 5px" /> -->
            <ElIcon style="vertical-align: middle; margin-right: 5px"><Iphone /></ElIcon>
            <span style="vertical-align: middle">手机登录</span>
          </span>
        </template>
        <loginPhone ref="phoneRef" />
      </ElTabPane>
    </ElTabs>
    <div class="remember-pwd">
      <ElCheckbox v-model="isRememberpwd">记住密码</ElCheckbox>
      <ElLink type="primary" :underline="false">忘记密码</ElLink>
    </div>
    <ElButton type="primary" class="loginbtn" @click="handleLoginClick">立即登录</ElButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// 继续拆分，手机号和账号登录的功能。借助elmentplus的elform组件来完成表单验证、提示等功能
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'
// 对于用到了ref，reactive，useStore，onMounted等的逻辑可以抽取到hook里面去
// 对于配置类的文件可以抽到config里面去

// 每个小组件的功能逻辑，由小组件自己管理，比如账号登录验证逻辑由账号登录页管理
// 通过ref<InstanceType<typeof loginAccount>>拿到组件的ref实例
// ref<>的模板中，需要传入一个拥有构造函数的实例，InstanceType<>可以取到<typeof loginAccount>的拥有构造函数的loginAccount实例
// 因为描述的对象不是类，所以当是一个类时可以直接传实例，是描述对象时要用InstanceType<typeof loginAccount>取到有构造函数的实例

// 根据element-plus的官网查询。给tabs绑定选项卡,并给每个选项卡一个name string/number 0开始

// 创建utils文件夹，放置工具。例如本地存储等

export default defineComponent({
  components: {
    loginAccount,
    loginPhone
  },
  setup() {
    const isRememberpwd = ref(true) // 会通过参数的类型，自动推导泛型的类型
    // 创建账户登录和手机登录的实例，并绑定到组件上
    const accountRef = ref<InstanceType<typeof loginAccount>>()
    const phoneRef = ref<InstanceType<typeof loginPhone>>()
    // 创建选项卡的记录,并填写默认值
    const currentTab = ref('account')
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isRememberpwd.value)
      } else {
        phoneRef.value?.loginAction()
      }
    }
    return {
      isRememberpwd,
      handleLoginClick,
      accountRef,
      phoneRef,
      currentTab
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 100px;
  width: 320px;
  .title {
    text-align: center;
  }
  .remember-pwd {
    display: flex;
    justify-content: space-between;
  }
  .loginbtn {
    width: 100%;
  }
  .deletepwd {
    border-bottom: none;
  }
}
</style>
