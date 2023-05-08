<template>
  <div class="user">
    <pageSearch
      :searchFromConfig="searchFormConfig"
      @resetHandle="handleReset"
      @queryHandle="handleQuery"
    ></pageSearch>
    <pageModel
      :modelConfig="modelConfigRef"
      ref="pageModelRef"
      :editInfo="editInfo"
      pageName="users"
    ></pageModel>
    <pageContent
      page-name="users"
      :tableContentConfig="tableContentConfig"
      ref="pageContentRef"
      @addNew="handleAddNew"
      @edit="handleEdit"
    ></pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import store from '@/store'

import { searchFormConfig } from './config/search.config'
import { tableContentConfig } from './config/content.config'
import { modelConfig } from './config/model.config'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModel from '@/components/page-model'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModel } from '@/hooks/usePageModel'

export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent,
    pageModel
  },
  setup() {
    // attention！下面使用了4处非空断言
    // user页面的新增和删除
    const addNewCb = () => {
      const password = modelConfig.formItems.find((item) => item.field === 'password')
      password!.isHidden = false
    }
    const editCb = () => {
      const password = modelConfig.formItems.find((item) => item.field === 'password')
      password!.isHidden = true
    }

    // 因为model页面不一样，需要动态的加载select选项，所以要做响应式
    const modelConfigRef = computed(() => modelConfig)
    // 动态加载select的options。如果下面代码不刷新就放到computed中
    const departmentItem = modelConfig.formItems.find((item) => item.field === 'departmentId')
    departmentItem!.options = store.state.entireDepartment.map((item) => ({
      title: item.name,
      value: item.id
    }))
    const roleItem = modelConfig.formItems.find((item) => item.field === 'roleId')
    roleItem!.options = store.state.entireRole.map((item) => ({ title: item.name, value: item.id }))

    // 用元组返回出去会变成ref包裹的组件
    // const [pageContentRef, handleReset, handleQuery] = usePageSearch()
    const { pageContentRef, handleReset, handleQuery } = usePageSearch()
    const { pageModelRef, editInfo, handleAddNew, handleEdit } = usePageModel([addNewCb, editCb])

    return {
      searchFormConfig,
      tableContentConfig,
      modelConfigRef,
      // search->content响应
      pageContentRef,
      handleReset,
      handleQuery,
      // content->edit页面响应
      pageModelRef,
      editInfo,
      handleAddNew,
      handleEdit
    }
  }
})
</script>

<style scoped lang="less"></style>
