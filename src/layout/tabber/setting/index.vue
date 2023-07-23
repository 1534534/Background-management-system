<template>
  <el-button size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
    <!-- <el-button slot="reference">content</el-button> -->
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker @change="setColor" :predefine="predefineColors" v-model="color" size="small"
          show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch @change="changeDark" inline-prompt inactive-icon="Sunny" active-icon="MoonNight" v-model="dark"
          class="mt-2" style="margin-left: 24px;" />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" icon="Setting" circle></el-button>
    </template>
  </el-popover>










  <img :src="userStore.avatar" style="width: 24px; height: 24px; margin: 0 10px" />
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
import { ref } from 'vue'
let $router = useRouter()
let $route = useRoute()
let LayOutSetingStore = useLayOutSetingStore()
const updateRefresh = () => {
  LayOutSetingStore.refresh = !LayOutSetingStore.refresh
}

//颜色组件组件的数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

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
let dark = ref<boolean>(false)
const changeDark = () => {
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}
const setColor = () => {
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
</script>
<style lang="scss" scoped></style>
