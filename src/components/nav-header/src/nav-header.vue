<template>
  <div class="nav-header">
    <ElIcon :size="25" class="foldmenu">
      <component :is="isFold ? 'Fold' : 'Expand'" @click="handleFoldClick"></component>
    </ElIcon>
    <div class="content">
      <z2qBreadcrumb :breadcrumbs="breadcrumbs"></z2qBreadcrumb>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import z2qBreadcrumb from '@/base-ui/breadcrumb'
import { routeMapMenuBreadcrumb } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
// 面包屑图标的操作可以通过emitter去做，也可以放到main中去做，因为main里面的宽度也要改变
export default defineComponent({
  emits: ['foldClick'],
  components: {
    UserInfo,
    z2qBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldClick', isFold.value)
    }
    // 获得面包屑
    const breadcrumbs = computed(() => {
      const userMenus = useStore().state.login.userMenus
      const route = useRoute()
      return routeMapMenuBreadcrumb(userMenus, route.path)
    })
    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  align-items: center;
  .foldmenu {
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
