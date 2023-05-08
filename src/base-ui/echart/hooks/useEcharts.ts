import * as echart from 'echarts'
import chinaMapData from '../data/china.json'

// 注册中国地图
echart.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  const echartIns = echart.init(el)
  const setOptions = (options: echarts.EChartsOption) => {
    echartIns.setOption(options)
  }
  // 监听浏览器大小变化，重绘图形
  window.addEventListener('resize', () => {
    echartIns.resize()
  })
  // 主动重绘图形
  const updateSize = () => {
    echartIns.resize()
  }
  // 注册函数
  const registerFcn = (type: string, event: (params?: any, echartIns?: any) => void) => {
    echartIns.on(type, (params: any) => {
      event(params, echartIns)
    })
  }
  // 绘制地图
  return { echartIns, setOptions, updateSize, registerFcn }
}
