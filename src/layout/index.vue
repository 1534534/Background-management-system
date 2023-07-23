<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ fold: LayOutSetingStore.fold ? true : false }"
    >
      <Logo></Logo>

      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :collapse="LayOutSetingStore.fold"
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: LayOutSetingStore.fold ? true : false }"
    >
      <Tabber></Tabber>
    </div>
    <!-- 内容区 -->
    <div
      class="layout_main"
      :class="{ fold: LayOutSetingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabber from './tabber/index.vue'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
import useLayOutSetingStore from '@/store/modules/setting'
let LayOutSetingStore = useLayOutSetingStore()

</script>
<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;

    &.fold {
      width: $base-menu-min-width;
    }

    .scrollbar {
      height: calc(100vh - $base-menu-logo-height);
      width: 100%;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: cyan;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
  }
}
</style>
