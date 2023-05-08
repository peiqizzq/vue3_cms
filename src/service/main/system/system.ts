import z2qios from '@/service'
import { IdataType } from '@/service/type'
import { IlistData } from './type'

export function getPageListReq(url: string, queryInfo: object) {
  return z2qios.post<IdataType<IlistData>>({
    url: url,
    data: queryInfo
  })
}
export function deletePagedataReq(url: string) {
  return z2qios.delete<IdataType>({
    url: url
  })
}
export function creataPagedataReq(url: string, newData: object) {
  return z2qios.post<IdataType>({
    url: url,
    data: newData
  })
}
export function editPagedataReq(url: string, editData: object) {
  return z2qios.patch<IdataType>({
    url: url,
    data: editData
  })
}
