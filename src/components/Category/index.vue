<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          :disable="scene == 0 ? false : true"
          @change="handle"
        >
          <el-option
            v-for="(c1, index) in categoryStore.c1Arr"
            :key="c1.id"
            :value="c1.id"
            :label="c1.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          :disable="scene == 0 ? false : true"
          @change="handle1"
        >
          <el-option
            v-for="(c2, index) in categoryStore.c2Arr"
            :key="c2.id"
            :value="c2.id"
            :label="c2.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.c3Id"
          :disable="scene == 0 ? false : true"
          @change="handle2"
        >
          <el-option
            v-for="(c3, index) in categoryStore.c3Arr"
            :key="c3.id"
            :value="c3.id"
            :label="c3.name"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
import { onMounted } from 'vue'
//接受父组件传递过来scene
defineProps(['scene'])
onMounted(() => {
  getC1()
})
//获取一级分类
const getC1 = () => {
  categoryStore.getC1()
}
//获取到一级分类后触发
const handle = () => {
  //清空二三级菜单
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  //通知仓库获取二级分类的数据
  categoryStore.getC2()
}
//获取到二级分类后触发
const handle1 = () => {
  categoryStore.c3Id = ''

  categoryStore.getC3()
}
//获取到三级分类后触发
const handle2 = () => {}
</script>

<style lang="scss" scoped></style>
