<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>
<script lang="ts" setup>
import { watch, ref, nextTick } from 'vue'
import useLayOutSetingStore from '@/store/modules/setting'
let LayOutSetingStore = useLayOutSetingStore()
let flag = ref(true)
watch(
  () => LayOutSetingStore.refresh,
  () => {
    //点击刷新按钮销毁路由组件
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>
<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
