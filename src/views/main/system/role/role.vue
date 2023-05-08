<template>
  <div class="role">
    <pageSearch
      :searchFromConfig="searchFormConfig"
      @resetHandle="handleReset"
      @queryHandle="handleQuery"
    ></pageSearch>
    <pageModel
      :modelConfig="modelConfig"
      pageName="role"
      ref="pageModelRef"
      :editInfo="editInfo"
      :otherInfo="otherInfo"
    >
      <div class="selectTree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheck"
        />
      </div>
      <!-- 选项tree的属性值是根据服务器返回的数据决定的 -->
    </pageModel>
    <pageContent
      :page-name="'role'"
      :tableContentConfig="tableContentConfig"
      ref="pageContentRef"
      @addNew="handleAddNew"
      @edit="handleEdit"
    ></pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModel from '@/components/page-model'

import { searchFormConfig } from './config/search.config'
import { tableContentConfig } from './config/content.config'
import { modelConfig } from './config/model.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModel } from '@/hooks/usePageModel'
import { menuMapLeaf } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    pageSearch,
    pageContent,
    pageModel
  },
  setup() {
    // 这里调eltree实例的setCheckedKeys方法，拿到叶子节点选中。
    // 也可以直接拿到数组后作为default到menus，绑定到组件上。
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const callback2 = (item: any) => {
      const leafArr = menuMapLeaf(item.menuList)
      // 这里拿到数据还来不及绑定到组件上，组件就已经显示了，要next推迟到下一帧
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafArr, false)

        // 这里有一个bug，这只处理了回显，并没有给otherInfo附上回显的值
        // 导致点开编辑之后什么都不操作就点confirm，会发送空selectTree
        // 原因：otherInfo的赋值操作在handleCheck内，不点击无法触发
        // console.log('leafArr', leafArr)
        // 解决方法
        const menuList = [
          ...elTreeRef.value!.getCheckedKeys(),
          ...elTreeRef.value!.getHalfCheckedKeys()
        ]
        otherInfo.value = { menuList }
      })
    }

    const { pageContentRef, handleReset, handleQuery } = usePageSearch()
    const { pageModelRef, editInfo, handleAddNew, handleEdit } = usePageModel([
      () => ({}),
      callback2
    ])
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    // 拿到selectTree选中的数据
    const otherInfo = ref({})
    // 这个函数查elementplus的组件
    const handleCheck = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      console.log('menulist', menuList)
      otherInfo.value = { menuList }
    }
    return {
      searchFormConfig,
      tableContentConfig,
      modelConfig,

      pageContentRef,
      handleReset,
      handleQuery,

      pageModelRef,
      editInfo,
      handleAddNew,
      handleEdit,
      menus,
      otherInfo,
      handleCheck,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.selectTree {
  margin-left: 70px;
}
</style>
