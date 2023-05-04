<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '65px' : '200px'">
        <NavMenu :collapse="isCollapse"></NavMenu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <NavHeader @foldClick="handleFoldChange"></NavHeader>
        </el-header>
        <el-main class="page-content">
          <div class="content"><RouterView></RouterView></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menus'
import NavHeader from '@/components/nav-header'
// 通过role查询的menus菜单设置动态路由
// 1.main的子模块动态路由不建议写死，否则通过修改路径访问会进入,有安全隐患
// 2.解决方法，不同角色注册不同路由，动态加载路由的数组，但是新增了角色就要修改代码重新部署
// 3.可以根据菜单动态生成路由映射routes数组，然后根据后端返回的component名称或者菜单的url映射去加载
// npm coderwhy工具，可以根据组件名称和文件夹，动态生成对应的组件文件和路由映射文件
// 具体的动态菜单路由映射可以放到路由守卫里面，也可以放到登录页面逻辑中
// 根据菜单加载路由可以抽离到utils工具map-menus中去
// 配置路由小心路由重名问题和组件重名问题。
// 动态添加的路由，刷新会404丢失，有可能是页面跳转先于恢复loadLocalLogin执行了。

export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      isCollapse,
      handleFoldChange
    }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
  .content {
    background-color: #fff;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
