<template>
  <div class="page-echarts">
    <z2qEchart :options="options"></z2qEchart>
  </div>
</template>

<script setup lang="ts">
import z2qEchart from '@/base-ui/echart'
import { defineProps, withDefaults, computed } from 'vue'
import { IpieData } from '../type'
const props = withDefaults(
  defineProps<{
    pieData: IpieData[]
  }>(),
  {}
)
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped></style>
