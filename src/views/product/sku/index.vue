<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <el-table border style="margin: 10px 0" :data="skuArr">
      <el-table-column type="index" label="序号" width="80px"></el-table-column>
      <el-table-column
        label="名称"
        width="80px"
        show-overflow-tooltip
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        width="300px"
        show-overflow-tooltip
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="图片" width="300px">
        <template #="{ row, $index }">
          <img :src="row.SkuDefault" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="300px"></el-table-column>
      <el-table-column label="价格" width="300px"></el-table-column>
      <el-table-column label="操作" fixed="right" width="300px">
        <template #="{ row, $index }">
          <el-button
            @click="updateSale(row)"
            type="primary"
            size="samll"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
          ></el-button>

          <el-button
            @click="updateSku"
            type="primary"
            size="samll"
            icon="Edit"
          ></el-button>
          <el-button
            @click="findSku(row)"
            type="primary"
            size="samll"
            icon="InfoFilled"
          ></el-button>

          <el-popconfirm
            :title="`你确定要删除${row.skuName}吗？`"
            width="200px"
            @confirm="deleteSku(row)"
          >
            <template #reference>
              <el-button type="primary" size="samll" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer v-model="drawer">
      <el-row style="margin: 10px 0">
        <el-col :span="6">名称</el-col>
        <el-col :span="18">小米</el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="6">销售属性</el-col>
        <el-col :span="18">
          <el-tag
            style="margin: 5px"
            v-for="item in skuInfo.skuSaleAttrValueList"
            :key="item.ID"
          >
            {{ item.saleAttrValueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-carousel
          height="200px"
          type="card"
          direction="horizontal"
          :interval="4000"
        >
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 text="2x1" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-row>
    </el-drawer>

    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout=" prev, pager, next, jumper,->,total, sizes,"
      :total="400"
      @size-change="handler"
      @current-change="getHasSku"
    />
  </el-card>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  reqSkuList,
  reqCancelSale,
  reqSaleSku,
  reqSkuInfo,
  reqDeleteSku,
} from '@/api/product/sku'
import type { SkuResponseData, SkuData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
import { SkuInfoData } from '@/api/product/spu/type'

let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let totla = ref<number>(10)
let skuArr = ref<SkuData[]>([])
let drawer = ref<boolean>(false)
let skuInfo = ref<any>({})
onMounted(() => {
  getHasSku()
})

const getHasSku = async (pager = 1) => {
  //当前分页器的页码
  pageNo.value = pager
  let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  console.log(result)
  if (result.code == 200) {
    totla.value = result.data.total
    skuArr.value = result.data.records
  }
}
//商品上架和下架
const updateSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    await reqCancelSale(row.id as number)
    ElMessage({
      type: 'success',
      message: '下架成功',
    })
  } else {
    await reqSaleSku(row.id as number)
    ElMessage({
      type: 'success',
      message: '上架成功',
    })
  }
}
//跟新SKU
const updateSku = () => {
  ElMessage({
    type: 'success',
    message: '努力更新中.。。。。',
  })
}
//查看商品详情按钮
const findSku = async (row: SkuData) => {
  drawer.value = true
  let result: SkuInfoData = await reqSkuInfo(row.id as number)
  console.log(result)

  if (result.code == 200) {
    skuInfo.value = result.data
  }
}
//删除商品

const deleteSku = async (row: SkuData) => {
  console.log(row)
  let result: any = await reqDeleteSku(row.id as number)
  console.log(result)

  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
const handler = () => {
  getHasSku()
}
</script>
<style lang="scss" scoped></style>
