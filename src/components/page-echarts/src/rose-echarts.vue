<template>
  <div class="rose-echarts">
    <z2qEchart :options="options"></z2qEchart>
  </div>
</template>

<script setup lang="ts">
import z2qEchart from '@/base-ui/echart'
import { defineProps, withDefaults, computed } from 'vue'
import { IpieData } from '../type'

const props = withDefaults(
  defineProps<{
    roseData: IpieData[]
  }>(),
  {}
)
const options = computed(() => {
  return {
    // legend: {
    //   top: 'bottom'
    // },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>
