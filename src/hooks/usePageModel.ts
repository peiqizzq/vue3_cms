import pageModel from '@/components/page-model'
import { ref } from 'vue'

type callbackFn = (item?: any) => void
export function usePageModel(cbs: callbackFn[] = []) {
  const pageModelRef = ref<InstanceType<typeof pageModel>>()
  const editInfo = ref<any>({})
  const handleAddNew = () => {
    editInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
      cbs[0] && cbs[0]()
    }
  }
  const handleEdit = (item: any) => {
    // 浅拷贝，不修改原数据，但是也是能根据原数据来响应的
    editInfo.value = { ...item } // 无法触发响应式，要修改单个数据时才会触发
    // console.log(item)
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
      cbs[1] && cbs[1](item) // 这个参数给selectTree用
    }
  }
  return { pageModelRef, editInfo, handleAddNew, handleEdit }
}
