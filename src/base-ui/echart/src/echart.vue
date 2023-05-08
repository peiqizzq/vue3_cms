<template>
  <div class="z2qEchart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEcharts from '../hooks/useEcharts'
// script setup中定义变量,设置默认值的方式。要用ts语法就使用泛型。有?表示可选，否则必传
// defineExpose是定义要暴漏出去的东西，比如相当于以前暴漏函数return{fcn1}，defineEmit，以前的emit
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
    fcn?: {
      type: string
      enent: (params?: any, ins?: any) => void
    }
  }>(),
  {
    width: '100%',
    height: '270px'
  }
)
const echartDivRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions, registerFcn } = useEcharts(echartDivRef.value!)

  // 在挂载完成后开始监听响应式
  watchEffect(() => {
    setOptions(props.options)
  })
  // 注册函数
  if (props.fcn) {
    // console.log('into registerFcn')
    registerFcn(props.fcn.type, props.fcn.enent)
  }
})
</script>

<style scoped></style>
