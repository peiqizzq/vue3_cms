<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <z2qCard title="分类商品数量(饼图)">
          <pieEcharts :pieData="pieData"></pieEcharts>
        </z2qCard>
      </el-col>
      <el-col :span="10">
        <z2qCard title="不同城市商品销量">
          <mapEcharts :mapData="mapData"></mapEcharts>
        </z2qCard>
      </el-col>
      <el-col :span="7">
        <z2qCard title="分类商品数量(玫瑰图)">
          <roseEcharts :roseData="pieData"></roseEcharts>
        </z2qCard>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <z2qCard title="分类商品的销量">
          <stackedAreaEcharts :="stackedAreaData"></stackedAreaEcharts>
        </z2qCard>
      </el-col>
      <el-col :span="12">
        <z2qCard title="分类商品的收藏">
          <columnEcharts :="columnData"></columnEcharts>
        </z2qCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import z2qCard from '@/base-ui/card'
import {
  pieEcharts,
  roseEcharts,
  stackedAreaEcharts,
  columnEcharts,
  mapEcharts
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    z2qCard,
    pieEcharts,
    roseEcharts,
    stackedAreaEcharts,
    columnEcharts,
    mapEcharts
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    // 图表数据
    const pieData = computed(() => {
      return store.state.dashboard.goodsCategoryCount.map((item) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const stackedAreaData = computed(() => {
      const xlabels: string[] = []
      const values: any[] = []

      for (const item of store.state.dashboard.goodsCategorySale) {
        xlabels.push(item.name)
        values.push(item.saleCount * 1)
      }
      return { xlabels, values }
    })
    const columnData = computed(() => {
      const xlabels: string[] = []
      const values: any[] = []

      for (const item of store.state.dashboard.goodsCategoryFavor) {
        xlabels.push(item.name)
        values.push(item.favorCount * 1)
      }
      return { xlabels, values }
    })
    const mapData = computed(() => {
      return store.state.dashboard.goodsAddressSale.map((item) => {
        return { name: item.address, value: item.count }
      })
    })

    // 使用案例
    // 绘制到本页面的htmlelement的时候，这个时候template模板还没有编译完，要放在生命周期里面
    // const divRef = ref<HTMLElement>()
    // onMounted(() => {
    //   // (dom,theme,renderer渲染器(canvas，svg))；options属性去官网查文档
    //   const myChart = echarts.init(divRef.value!, 'dafault', { renderer: 'svg' })
    //   const options = {
    //     color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    //     title: {
    //       text: '绚烂多彩'
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         type: 'cross',
    //         label: {
    //           backgroundColor: '#6a7985'
    //         }
    //       }
    //     },
    //     legend: {
    //       data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
    //     },
    //     toolbox: {
    //       feature: {
    //         saveAsImage: {}
    //       }
    //     },
    //     grid: {
    //       left: '3%',
    //       right: '4%',
    //       bottom: '3%',
    //       containLabel: true
    //     },
    //     xAxis: [
    //       {
    //         type: 'category',
    //         boundaryGap: false,
    //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //       }
    //     ],
    //     yAxis: [
    //       {
    //         type: 'value'
    //       }
    //     ],
    //     series: [
    //       {
    //         name: 'Line 1',
    //         type: 'line',
    //         stack: 'Total',
    //         smooth: true,
    //         lineStyle: {
    //           width: 0
    //         },
    //         showSymbol: false,
    //         areaStyle: {
    //           opacity: 0.8,
    //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //             {
    //               offset: 0,
    //               color: 'rgb(128, 255, 165)'
    //             },
    //             {
    //               offset: 1,
    //               color: 'rgb(1, 191, 236)'
    //             }
    //           ])
    //         },
    //         emphasis: {
    //           focus: 'series'
    //         },
    //         data: [140, 232, 101, 264, 90, 340, 250]
    //       },
    //       {
    //         name: 'Line 2',
    //         type: 'line',
    //         stack: 'Total',
    //         smooth: true,
    //         lineStyle: {
    //           width: 0
    //         },
    //         showSymbol: false,
    //         areaStyle: {
    //           opacity: 0.8,
    //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //             {
    //               offset: 0,
    //               color: 'rgb(0, 221, 255)'
    //             },
    //             {
    //               offset: 1,
    //               color: 'rgb(77, 119, 255)'
    //             }
    //           ])
    //         },
    //         emphasis: {
    //           focus: 'series'
    //         },
    //         data: [120, 282, 111, 234, 220, 340, 310]
    //       },
    //       {
    //         name: 'Line 3',
    //         type: 'line',
    //         stack: 'Total',
    //         smooth: true,
    //         lineStyle: {
    //           width: 0
    //         },
    //         showSymbol: false,
    //         areaStyle: {
    //           opacity: 0.8,
    //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //             {
    //               offset: 0,
    //               color: 'rgb(55, 162, 255)'
    //             },
    //             {
    //               offset: 1,
    //               color: 'rgb(116, 21, 219)'
    //             }
    //           ])
    //         },
    //         emphasis: {
    //           focus: 'series'
    //         },
    //         data: [320, 132, 201, 334, 190, 130, 220]
    //       },
    //       {
    //         name: 'Line 4',
    //         type: 'line',
    //         stack: 'Total',
    //         smooth: true,
    //         lineStyle: {
    //           width: 0
    //         },
    //         showSymbol: false,
    //         areaStyle: {
    //           opacity: 0.8,
    //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //             {
    //               offset: 0,
    //               color: 'rgb(255, 0, 135)'
    //             },
    //             {
    //               offset: 1,
    //               color: 'rgb(135, 0, 157)'
    //             }
    //           ])
    //         },
    //         emphasis: {
    //           focus: 'series'
    //         },
    //         data: [220, 402, 231, 134, 190, 230, 120]
    //       },
    //       {
    //         name: 'Line 5',
    //         type: 'line',
    //         stack: 'Total',
    //         smooth: true,
    //         lineStyle: {
    //           width: 0
    //         },
    //         showSymbol: false,
    //         label: {
    //           show: true,
    //           position: 'top'
    //         },
    //         areaStyle: {
    //           opacity: 0.8,
    //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //             {
    //               offset: 0,
    //               color: 'rgb(255, 191, 0)'
    //             },
    //             {
    //               offset: 1,
    //               color: 'rgb(224, 62, 76)'
    //             }
    //           ])
    //         },
    //         emphasis: {
    //           focus: 'series'
    //         },
    //         data: [220, 302, 181, 234, 210, 290, 150]
    //       }
    //     ]
    //   }
    //   myChart.setOption(options)
    // })
    return { pieData, stackedAreaData, columnData, mapData }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 10px;
}
</style>
