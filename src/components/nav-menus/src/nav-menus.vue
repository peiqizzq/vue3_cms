<template>
  <div class="nav-menu">
    <div class="logo">
      <!-- musstach语法中用别名加~ -->
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-if="!collapse">mall_cms</span>
    </div>
    <!-- 可以通过$store.state.login.userMenus去拿到菜单，也可以用computed计算属性 -->
    <!-- 这里的default-active是根据key的 -->
    <el-menu
      :default-active="activeId"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <!-- 根据element-plus的代码去动态生成。vue2上不可以加key -->
      <template v-for="item in userMenus" :key="item.id">
        <!-- 一级菜单(可展开) -->
        <template v-if="item.type === 1">
          <!-- 展开的标题。给item加上index属性记录是否选中 -->
          <ElSubMenu :index="item.id + ''">
            <!-- 这里根据element-plus,使用具名插槽 -->
            <template #title>
              <!-- element-plus取消了字体图标。现在用动态组件来实现 -->
              <template v-if="item.icon">
                <ElIcon><component :is="item.icon"></component></ElIcon>
              </template>
              <span>{{ item.name }}</span>
            </template>

            <!-- 一级子标题 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <ElMenuItem :index="subitem.id + ''" @click="handleSubmenuClick(subitem)">
                <template v-if="subitem.icon">
                  <ElIcon><component :is="item.icon"></component></ElIcon>
                </template>
                <span>{{ subitem.name }}</span>
              </ElMenuItem>
            </template>
          </ElSubMenu>
        </template>
        <!-- 二级菜单(无法展开) -->
        <template v-else-if="item.type === 2">
          <ElMenuItem :index="item.id + ''">
            <template v-if="item.icon">
              <ElIcon><component :is="item.icon"></component></ElIcon>
            </template>
            <span>{{ item.name }}</span>
          </ElMenuItem>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import router from '@/router'
import { useRoute } from 'vue-router'
import { routeMapMenuId } from '@/utils/map-menus'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  // vuex和ts的兼容性不是很好，比如无法对子模块的东西进行提示。pinio库也可以
  // store是any类型，存在隐患，可以自己写一个useStore，传入子模块泛型
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)
    // 更新active
    const route = useRoute()
    const activeId = ref(routeMapMenuId(userMenus.value, route.path).id + '' ?? '2')
    // 路由切换
    const handleSubmenuClick = (subitem: any) => {
      router.push(subitem.url ?? 'notfound')
    }
    return {
      userMenus,
      handleSubmenuClick,
      activeId
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
