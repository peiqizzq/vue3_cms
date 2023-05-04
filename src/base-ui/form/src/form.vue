<template>
  <div class="z2qform">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 绑定labelWidth和itemStyle，由上层决定（props的属性）这些props可以抽出来，在上层直接绑定 -->
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item of formItems" :key="item.label">
          <el-col :="colLayout">
            <el-form-item :label="item?.label" :style="itemStyle">
              <!-- 通过type属性决定这里是什么组件 -->
              <component
                :is="item.itemType"
                style="width: 100%"
                :="{ ...item, ...item?.otherOptions }"
                v-model="formData[`${item.field}`]"
              >
                <!-- 单独处理select -->
                <template v-if="item.itemType === 'el-select'">
                  <el-option
                    v-for="option in item?.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </template>
              </component>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, watch } from 'vue'
import { IformItem } from './type'

export default defineComponent({
  props: {
    // v-model双向绑定的默认名称
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IformItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: '10px 40px'
      })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 响应测试
    // const rawData = { ...props.modelValue }
    // const formData = ref(rawData)
    // 从props解构，相当于浅拷贝了一份对象，对象的内容是props的解构，简单类型数据的修改不破坏单项数据流
    const formData = ref({ ...props.modelValue })
    // 再通过watch深度监听formData的修改，通过emit提交更改，让父组件去修改props
    watch(
      formData,
      (newValue) => {
        console.log(newValue)
        emit('update:modelValue', newValue)
      },
      { deep: true }
    )

    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.z2qform {
  padding-top: 22px;
}
</style>
