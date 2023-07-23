<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input v-model="SpuParams.spuName" placeholder="请您输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId">
        <el-option v-for="(item, index) in AllTradeMark" :value="item.id" :key="item.id" :label="item.tmName"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" v-model="SpuParams.description" placeholder="请您输入SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload v-model:file-List="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <!-- 查看照片的对话框 -->

      <el-dialog v-model="dialogVisible">
        <el-icon>
          <Plus />
        </el-icon>
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width:100%;height: 100%;" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select v-model="saleAttrIdAndValueName" :placeholder="unSelectSaleAttr.length
        ? `还未选择${unSelectSaleAttr.length}个`
        : '无'
        ">
        <el-option v-for="(item, index) in unSelectSaleAttr" :key="item.id" :label="item.name"
          :value="`${item.id}:${item.name}`"></el-option>
      </el-select>
      <el-button :disabled="saleAttrIdAndValueName ? false : true" style="margin-left: 10px" type="primary" size="default"
        icon="Plus" @click="addSaleAttr">
        添加属性
      </el-button>

      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="销售属性名字" prop="saleAttrName" width="120px"></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row, $index }">
            <el-tag v-for="(item, index) in row.spuSaleAttrValueList" class="mx-1" closable style="margin: 0 5px"
              @close="row.spuSaleAttrValueList.splice(index, 1)" :key="row.id">
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input style="width: 100px" v-if="row.flag == true" v-model="row.SaleAttrValue" placeholder="请您输入属性值"
              size="small" @blur="toLook(row)"></el-input>
            <el-button @click="toEdit(row)" v-else type="primary" size="small" icon="Plus"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="Delete" @click="saleAttr.splice($index, 1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAllTradeMark,
  reqSpuImageList,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
import { ref, computed } from 'vue'
import type {
  SaleAttrValue,
  HasSaleAttr,
  SpuData,
  AllTradeMark,
  SaleAttr,
  SpuImg,
  Trademark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'

let $emit = defineEmits(['changeScene'])
//将来收集还未选择的销售属性的ID与属性值的名字
let saleAttrIdAndValueName = ref<string>('')
//存储已有的SPU这些数据
let AllTradeMark = ref<Trademark[]>([])
//商品图片
let imgList = ref<SpuImg[]>([])
//已有的SPU销售属性
let saleAttr = ref<SaleAttr[]>([])
//全部销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])

let SpuParams = ref<SpuData>({
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})
const initHasSpuData = async (spu: SpuData) => {
  //存储已有的spu对象，将来在模板中展示
  SpuParams.value = spu
  //获取全部匹配数据
  let result: AllTradeMark = await reqAllTradeMark()
  //获取某一品牌的全部售卖商品的图片
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  //获取整个项目全部spu销售属性
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  //获取整个项目全部SPU的销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()
  //存储全部品牌数据
  AllTradeMark.value = result.data
  //SPU对应的商品图片
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  //存储已有的SPA销售属性
  saleAttr.value = result2.data
  //存储全部的SPA销售属性
  allSaleAttr.value = result3.data
}

//保存按钮的回调
const save = async () => {
  //照片墙的数据
  SpuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  //整理销售属性的数据
  SpuParams.value.spuSaleAttrList = saleAttr.value
  let result = await reqAddOrUpdateSpu(SpuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新成功' : '添加成功',
    })
    $emit('changeScene', {
      flag: 0,
      params: SpuParams.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage({
      type: 'error',
      message: SpuParams.value.id ? '更新失败' : '添加失败',
    })
  }
}

const cancel = () => {
  $emit('changeScene', { flag: 0, params: '' })
}
//照片墙删除文件钩子
const handleRemove = () => {
  console.log(123)
}
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//存储预览图片地址
let dialogImageUrl = ref<string>('')
//照片墙点击预览按钮触发
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
//照片上传成功之前约束文件大小和类型

const handlerUpload = (file: any) => {
  if (
    file.type == 'image/png' ||
    file.type == 'image/jpeg' ||
    file.type == 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件需小于3M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传问及务必为PNG|JPG|GIF',
    })
    return false
  }
}
//计算出当前SPU未拥有的属性
let unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectArr
})
//添加销售属性
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAndValueName.value = ''
}
const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }

  if ((saleAttrValue as string).trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空的',
    })
    return
  }

  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复',
    })
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
}
const toEdit = (row: SaleAttr) => {
  row.flag = true
  row.saleAttrValue = ''
}
//添加一个新的SPU初始化请求方法
const initAddSpu = async (c3Id: number | string) => {
  //每次添加spu前清空上一次的数据
  Object.assign(SpuParams.value, {
    category3Id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
  })
  imgList.value = []
  saleAttr.value = []
  saleAttrIdAndValueName.value = ''
  //存储三级分类id
  SpuParams.value.category3Id = c3Id
  let result: AllTradeMark = await reqAllTradeMark()
  let result1: HasSaleAttrResponseData = await reqAllSaleAttr()

  AllTradeMark.value = result.data
  allSaleAttr.value = result1.data
}

defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

