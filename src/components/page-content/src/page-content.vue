<template>
  <div class="pageContent">
    <z2qTable
      :tableData="dataList"
      :="tableContentConfig"
      v-model:pageInfo="pageInfo"
      :pageListCount="dataListCount"
      @selectionChange="selected"
    >
      <!-- 传入表头插槽，放按钮，表名等 -->
      <!-- header是大插槽，插的是一整个表头(表格上面整个包括左边标题到右边按钮)。-->
      <!-- header-handle是小插槽，只插右边的按钮那块，左边标题用默认的 -->
      <!-- <template #header></template> -->
      <template #header-handle>
        <ElButton type="primary" v-if="isCreate" @click="handleAddNew">新建</ElButton>
        <ElButton :icon="Refresh" @click="getPageContent()"></ElButton>
      </template>

      <!-- 使用作用域插槽，拿到子组件插槽传上来的数据 -->
      <!-- 对想要定制样式的列通过作用域插槽处理 -->
      <template #status="scope">
        <!-- 状态按钮不能固定，商品和人员是不一样的，做成默认插槽 -->
        <slot name="status" :row="scope.row">
          <ElButton plain size="small" :type="scope.row.enable === 1 ? 'success' : 'danger'">{{
            scope.row.enable === 1 ? '启用' : '禁用'
          }}</ElButton>
        </slot>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #options="scope">
        <div class="options">
          <ElButton type="primary" size="small" text v-if="isUpdate" @click="handleEdit(scope.row)">
            <ElIcon><Edit /></ElIcon>
            编辑
          </ElButton>
          <ElButton
            type="danger"
            size="small"
            text
            v-if="isDelete"
            @click="handleDelete(scope.row)"
          >
            <ElIcon><Delete /></ElIcon>
            删除
          </ElButton>
        </div>
      </template>

      <!-- 传入表尾插槽，放分页器等。默认分页器 -->
      <!-- <template #footer></template> -->

      <!-- 创建动态插槽，接收不同页面的定制组件。例如在goods页面中 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </z2qTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import z2qTable from '@/base-ui/table'
import { Refresh } from '@element-plus/icons-vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'

export default defineComponent({
  props: {
    pageName: {
      type: String,
      required: true
    },
    tableContentConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    z2qTable
  },
  emits: ['addNew', 'edit'],
  setup(props, { emit }) {
    const store = useStore()
    // 获取按钮权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    // 监听页面发生的改变，重新发送请求
    watch(pageInfo, () => getPageContent())

    // 发起getlist的网络请求
    const getPageContent = (queryInfo: object = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        // 去查看api的请求
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageContent()

    const selected = (value: any) => {
      // console.log(value)
    }

    // 拿到page页面数据
    const dataList = computed(() => store.getters['system/pageList'](props.pageName))
    const dataListCount = computed(() => store.getters['system/pageListCount'](props.pageName))

    // 拿到定制插槽的名称
    const otherPropSlots = props.tableContentConfig.tableContentProps.filter((item: any) => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'options') return false
      return true
    })

    // 实现按钮功能
    const handleDelete = (item: any) => {
      store.dispatch('system/deletePagedataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleAddNew = () => {
      emit('addNew')
    }
    const handleEdit = (item: any) => {
      emit('edit', item)
    }
    return {
      Refresh,
      dataList,
      pageInfo,
      selected,
      getPageContent,
      dataListCount,
      otherPropSlots,

      isCreate,
      isUpdate,
      isDelete,

      handleDelete,
      handleAddNew,
      handleEdit
    }
  }
})
</script>

<style scoped>
.pageContent {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
