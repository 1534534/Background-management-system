<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0 10px"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore()
import useLayOutSetingStore from '@/store/modules/setting'
import { useRouter, useRoute } from 'vue-router'
let $router = useRouter()
let $route = useRoute()
let LayOutSetingStore = useLayOutSetingStore()
const updateRefresh = () => {
  LayOutSetingStore.refresh = !LayOutSetingStore.refresh
}
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const logout = async () => {
  //
  //清空仓库中用户相关的数据
  await userStore.userLogout()
  //跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<style lang="scss" scoped></style>
