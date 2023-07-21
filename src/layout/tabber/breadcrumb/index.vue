<template>
  <!-- 顶部左侧的图标 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayOutSetingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!--面包屑动态展示路由标题 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin: 0 3px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import useLayOutSetingStore from '@/store/modules/setting'
let LayOutSetingStore = useLayOutSetingStore()
import { useRoute } from 'vue-router'
let $route = useRoute()
const changeIcon = () => {
  LayOutSetingStore.fold = !LayOutSetingStore.fold
}
</script>
<style lang="scss" scoped></style>
