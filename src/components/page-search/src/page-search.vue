<template>
  <div class="pageSearch">
    <z2qForm :="searchFromConfig" v-model="formData">
      <template #header>
        <h2>高级检索</h2>
      </template>
      <template #footer>
        <div class="footer">
          <el-button @click="handleReset">重置</el-button>
          <el-button @click="handleQuery" type="primary">检索</el-button>
        </div>
      </template>
    </z2qForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import z2qForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFromConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    z2qForm
  },
  emits: ['resetHandle', 'queryHandle'],
  setup(props, { emit }) {
    // reactive做双向绑定有一点问题，建议使用ref
    // 数据的内容应该和config文件的field保持一致，因此需要动态获取
    const formItems = props.searchFromConfig.formItems ?? []
    const formDataRaw: any = {}
    for (const item of formItems) {
      formDataRaw[item.field] = ''
    }
    // const formData = formDataRaw
    const formData = ref(formDataRaw)
    // 函数
    const handleReset = () => {
      // 直接editInfo.value = formDataRaw不会触发响应
      for (const key in formDataRaw) {
        formData.value[key] = formDataRaw[key] //`${key}`
      }
      emit('resetHandle')
      // 经过测试，上层的ref的props：formData传递进去，在子组件内ref({ ...props.modelValue })解构，是能够接到上层的改变的
      // 因为解构对象是包裹了ref的，所以应该是上层的ref依赖收集到了子组件的ref包裹解构对象，发生改变后会更新子组件的解构对象内容。
      // 子组件的props本来就是引用类型。对响应式对象解构会失去响应式。通过子组件里的响应测试代码可以知道确实是收集到了子组件的ref解构对象。
      // 并且解构对象和props：modelValue独立，是两个独立对象，因为不emit触发'update:modelValue'，上层不会更新props
      // 响应循环？v-model绑定input也是一样，input->data->input
      // formData.value['name'] = 'sssssbbbbbb'

      // 也可以不采用双向绑定，通过双向绑定pageserach和z2qForm组件；在z2qForm和el-xx组件之间:model-value单向绑定z2qForm的props的属性
      // 并通过el-xx触发自身的@update:modelValue，在z2qForm的handle函数里触发pageSearch的update:modelValue更新，达到传递的效果
    }
    // 触发搜索事件
    const handleQuery = () => {
      emit('queryHandle', formData.value)
    }
    return {
      formData,
      handleReset,
      handleQuery
    }
  }
})
</script>

<style scoped>
.footer {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
