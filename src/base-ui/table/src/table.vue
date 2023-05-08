<template>
  <div>
    <!-- tablecontent的header插槽 -->
    <div class="header">
      <slot name="header">
        <!-- 默认内容，如果不传header插槽 -->
        <div class="title">{{ title }}</div>
        <div class="handle">
          <slot name="header-handle"></slot>
        </div>
      </slot>
    </div>
    <!-- el-table有默认插槽，用来修改列的内容，作用域插槽scope可以拿到数据{ row, column, $index } -->
    <!-- prop是用来对应tableData的一个数据名称 -->
    <el-table
      border
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelected"
      :="childrenProps"
    >
      <!-- table的index列和select列 -->
      <!-- 通过触发selectChange把数据发送出去 -->
      <el-table-column v-if="isShowSelect" type="selection"></el-table-column>
      <el-table-column
        v-if="isShowIndex"
        type="index"
        minWidth="50"
        align="center"
        label="序号"
      ></el-table-column>
      <!-- table的内容 -->
      <template v-for="tableItem in tableContentProps" :key="tableItem.prop">
        <!-- <el-table-column prop="date" label="Date" min-width="180" /> -->
        <el-table-column :="tableItem" align="center" show-overflow-tooltip>
          <!-- 使用el-table-column的默认作用域插槽，通过循环在创建每一列的时候放入列插槽，scpoe拿的是下面一层的数据，是个对象 -->
          <template #default="scope">
            <!-- 通过config的slotName动态的给特定的列设置插槽 -->
            <!-- 放置新的插槽，供外面使用，承上启下 -->
            <slot :name="tableItem.slotName" :row="scope.row">
              <!-- 在没有有slotName的列，slot插槽不起作用，只插入{{ scope.row[tableItem.prop] }}到el-table-column的插槽 -->
              <!-- 在有slotName的列上，数据带着插槽，一起插入el-table-column的插槽里面 -->
              {{ scope.row[tableItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- tablecontent的footer插槽 -->
    <div class="footer" v-if="isShowPagination">
      <slot name="footer">
        <!-- el-pagination弃用text-align属性，改为layout，->后的属性都会靠右 -->
        <el-pagination
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="->, total, sizes, prev, pager, next, jumper"
          :total="pageListCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :hide-on-single-page="false"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { ItableProp } from './type'

export default defineComponent({
  props: {
    // 内容数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 页面信息
    pageInfo: {
      type: Object,
      default: () => ({
        currentPage: 0,
        pageSize: 10
      })
    },
    pageListCount: {
      type: Number,
      default: 0
    },
    //tableContentConfig的几个属性
    title: {
      type: String,
      dafault: 'title'
    },
    tableContentProps: {
      type: Array as PropType<ItableProp[]>,
      default: () => []
    },
    isShowIndex: {
      type: Boolean,
      default: false
    },
    isShowSelect: {
      type: Boolean,
      default: false
    },
    isShowPagination: {
      type: Boolean,
      default: true
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['selectionChange', 'update:pageInfo'],
  setup(props, { emit }) {
    // 监听select动作
    // el-table本身有'selection-change'事件，这个函数就是用来接收事件的
    const handleSelected = (value: any) => {
      // 函数里面触发的这个事件的是我们自己定义的table.vue组件的事件。
      emit('selectionChange', value)
    }
    // 触发pageInfo改变的事件,当前页面的大小和当前页数
    const handleCurrentChange = (currentPage: number) => {
      emit('update:pageInfo', { ...props.pageInfo, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      // console.log({ ...props.pageInfo, pageSize })
      emit('update:pageInfo', { ...props.pageInfo, pageSize })
    }
    // console.log(props.tableData)

    return {
      handleSelected,
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;
}
</style>
