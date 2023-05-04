<template>
  <div class="pageModel">
    <el-dialog v-model="dialogVisible" title="新建" width="25%" center>
      <z2qForm :="modelConfig" v-model="formData"></z2qForm>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import z2qForm from '@/base-ui/form'

export default defineComponent({
  components: {
    z2qForm
  },
  props: {
    modelConfig: {
      type: Object,
      required: true
    },
    editInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const formData = ref<any>({})
    const dialogVisible = ref(false)
    // 通过watch监听editInfo的变化来修改formData
    watch(
      () => props.editInfo,
      (newValue) => {
        for (const item of props.modelConfig.formItems) {
          // 拿到配置文件里面的值，只取新建表单里面所需要的那些
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    return {
      formData,
      dialogVisible
    }
  }
})
</script>

<style scoped></style>
