<template>
  <div class="user">
    <pageSearch
      :searchFromConfig="searchFormConfig"
      @resetHandle="handleReset"
      @queryHandle="handleQuery"
    ></pageSearch>
    <pageModel :modelConfig="modelConfig" ref="pageModelRef" :editInfo="editInfo"></pageModel>
    <pageContent
      :page-name="'users'"
      :tableContentConfig="tableContentConfig"
      ref="pageContentRef"
      @addNew="handleAddNew"
      @edit="handleEdit"
    ></pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
    // 用元组返回出去会变成ref包裹的组件
    // const [pageContentRef, handleReset, handleQuery] = usePageSearch()
    const { pageContentRef, handleReset, handleQuery } = usePageSearch()
    const { pageModelRef, editInfo, handleAddNew, handleEdit } = usePageModel()
    return {
      searchFormConfig,
      tableContentConfig,
      modelConfig,
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
