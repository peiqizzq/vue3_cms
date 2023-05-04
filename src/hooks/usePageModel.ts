import pageModel from '@/components/page-model'
import { ref } from 'vue'

export function usePageModel() {
  const pageModelRef = ref<InstanceType<typeof pageModel>>()
  const editInfo = ref<any>({})
  const handleAddNew = () => {
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
  }
  const handleEdit = (item: any) => {
    // 浅拷贝，不修改原数据，但是也是能根据原数据来响应的

    editInfo.value = { ...item } // 无法触发响应式，要修改单个数据时才会触发这个
    // console.log(editInfo)
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
  }
  return { pageModelRef, editInfo, handleAddNew, handleEdit }
}
