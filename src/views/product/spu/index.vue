<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <div v-show="scene == 0">
        <el-button @click="addSpu" type="primary" size="default" icon="Plus"
          :disabled="categoryStore.c3Id ? false : true">
          添加SPU
        </el-button>

        <el-table border style="margin: 10px 10px" :data="records">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="SPU操作">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" icon="Plus" title="添加SKU" @click="addSku(row)"></el-button>
              <el-button type="primary" size="small" icon="Edit" @click="updateSpu()"></el-button>
              <el-button type="primary" size="small" icon="View" @click="findSku(row)"></el-button>
              <el-popconfirm :title="`你确定删除${row.spuName}?`" width="200px" @confirm="deleteSpu(row)">
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7]"
          :background="true" layout=" prev, pager, next, jumper,->,total, sizes," :total="400" @size-change="changeSize"
          @current-change="getHasSpu" />
      </div>
      <spuForm ref="spu" v-show="scene == 1" @changeScene="changeScene"></spuForm>
      <skuForm ref="sku" v-show="scene == 2" @changeScene="changeScene"></skuForm>
      <el-dialog title="SKU列表" v-model="show">
        <el-table :data="skuArr" border>
          <el-table-column label="SKU名称" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #="{ row, $index }">
              <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import skuForm from './skuForm.vue'
import spuForm from './spuForm.vue'
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
import { ref, watch, onBeforeUnmount } from 'vue'
import {
  HasSpuResponseData,
  Records,
  SkuInfoData,
  SpuData,
  SkuData,
} from '@/api/product/spu/type'
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu/index'
import { ElMessage } from 'element-plus'
let scene = ref<number>(0)
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let records = ref<Records>([])
let spu = ref<any>()
let sku = ref<any>()
//存储全部的SKU数据
let skuArr = ref<SkuData[]>([])
let show = ref<boolean>(false)
watch(
  () => categoryStore.c3Id,
  () => {
    records.value = []
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)
//获取三级分类下已有的全部spu
const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )

  if (result.code == 200) {
    records.value = result.data.records
  }
}
const changeSize = () => {
  getHasSpu()
}
//添加SPU按钮
const addSpu = () => {
  scene.value = 1
  spu.value.initAddSpu(categoryStore.c3Id)
}

//修改SPU
const updateSpu = () => {
  scene.value = 1
}
const changeScene = (obj: any) => {
  scene.value = obj.flag
  if (obj.params == 'updata') {
    //更新留在当前页
    getHasSpu(pageNo.value)
  } else {
    //添加跳转到第一页
    getHasSpu()
  }
}
//添加SKU回调
const addSku = (row: SkuData) => {
  scene.value = 2
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
//查看
const findSku = async (row: SpuData) => {
  let result: SkuInfoData = await reqSkuList(row.id as number)

  if (result.code == 200) {
    skuArr.value = result.data
    show.value = true
  }
}
//删除
const deleteSpu = async (row: SpuData) => {
  let result: any = await reqRemoveSpu(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
//路由组件销毁前，清空仓库关于分类的数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>
<style lang="scss" scoped></style>
