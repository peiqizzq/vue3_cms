<template>
  <div class="stackedArea-echarts">
    <z2qEchart :options="options"></z2qEchart>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed } from 'vue'
import z2qEchart from '@/base-ui/echart'
const props = withDefaults(
  defineProps<{
    xlabels: string[]
    values: any[]
  }>(),
  {}
)
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {},
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.xlabels
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '类别销量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.values
      }
      // 第二个折线图
      // {
      //   name: 'Union Ads',
      //   type: 'line',
      //   stack: 'Total',
      //   areaStyle: {},
      //   emphasis: {
      //     focus: 'series'
      //   },
      //   data: [220, 182, 191, 234, 290, 330, 310]
      // }
    ]
  }
})
</script>

<style scoped></style>
