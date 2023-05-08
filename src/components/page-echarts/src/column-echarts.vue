<template>
  <div class="column-echarts">
    <z2qEchart :options="options" ref="z2qEchartIns" :fcn="fcn"></z2qEchart>
  </div>
</template>

<script setup lang="ts">
import z2qEchart from '@/base-ui/echart'
import * as echarts from 'echarts'
import { withDefaults, defineProps, computed } from 'vue'
const props = withDefaults(
  defineProps<{
    xlabels: string[]
    values: any[]
  }>(),
  {}
)
// 注册点击事件
const clickEvent = (params: any, echartsIns: any) => {
  const zoomSize = 6
  // console.log(props.xlabels[Math.max(params.dataIndex - zoomSize / 2, 0)])
  echartsIns.dispatchAction({
    type: 'dataZoom',
    startValue: props.xlabels[Math.max(params.dataIndex - zoomSize / 2, 0)],
    endValue: props.xlabels[Math.min(params.dataIndex + zoomSize / 2, props.values.length - 1)]
  })
}
const fcn = {
  type: 'click',
  enent: clickEvent
}
// 配置参数
const options = computed(() => {
  return {
    xAxis: {
      data: props.xlabels,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: props.values
      }
    ]
  }
})
</script>

<style scoped></style>
