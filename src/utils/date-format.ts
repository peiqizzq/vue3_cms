// 使用dayjs库来转换时间
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export default function UTCFormat(utcString: string, format: string = DATE_TIME_FORMAT) {
  return dayjs.utc(utcString).format(format)
}
