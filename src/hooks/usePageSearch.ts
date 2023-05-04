import pageContent from '@/components/page-content'
import { ref } from 'vue'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  const handleReset = () => {
    pageContentRef.value?.getPageContent()
  }
  const handleQuery = (queryInfo: any) => {
    console.log('hooks', queryInfo)
    pageContentRef.value?.getPageContent(queryInfo)
  }
  return { pageContentRef, handleReset, handleQuery }
  // return [pageContentRef, handleReset, handleQuery]
  // 用元组返回，并且没设置类型，函数返回值类型推导是Ref<any>|(queryInfo?) => void类型
}
