<template>
  <div class="pageModel">
    <el-dialog v-model="dialogVisible" title="新建" width="25%" center destroy-on-close>
      <z2qForm :="modelConfig" v-model="formData"></z2qForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import z2qForm from '@/base-ui/form'

export default defineComponent({
  components: {
    z2qForm
  },
  props: {
    pageName: {
      type: String,
      required: true
    },
    modelConfig: {
      type: Object,
      required: true
    },
    editInfo: {
      type: Object,
      default: () => ({})
    },
    // 拿来接收其他的例如selectTree的数据
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const store = useStore()
    const formData = ref<any>({})
    const dialogVisible = ref(false)
    // 通过watch监听editInfo的变化来修改formData
    watch(
      () => props.editInfo,
      (newValue) => {
        for (const item of props.modelConfig.formItems) {
          // 拿到配置文件里面的值，只取新建表单里面所需要的那些
          // console.log('newvalue', newValue)
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    // 确认按钮
    const handleConfirm = () => {
      dialogVisible.value = false
      if (Object.keys(props.editInfo).length) {
        // 有长度，编辑，patch操作
        // const testdata = { ...formData.value, ...props.otherInfo }
        // console.log('testdata', testdata)
        store.dispatch('system/editPagedataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.editInfo.id
        })
      } else {
        // 没有长度，新建操作
        store.dispatch('system/createPagedataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      formData,
      dialogVisible,
      handleConfirm
    }
  }
})
</script>

<style scoped></style>
