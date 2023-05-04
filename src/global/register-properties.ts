import { App } from 'vue'
import UTCFormat from '@/utils/date-format'

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    // 根据服务器返回的时间格式来修改
    formatTime(timeRaw: string, format?: string) {
      return UTCFormat(timeRaw, format)
    }
  }
}
