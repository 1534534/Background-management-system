<template>
  <el-card class="box-card">
    <!--  -->

    <el-button type="primary" size="default" icon="Plus" @click="addTrademark">
      添加品牌
    </el-button>
    <el-table style="margin: 10px 0" border :data="trademarkArr">
      <el-table-column
        label="序号"
        type="index"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTrademark(row)"
          ></el-button>
          <el-popconfirm
            :title="`您确定要删除${row.tmName}?`"
            width="250px"
            icon="Delete"
            @confirm="removeTradeMark(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="demo-pagination-block">
      <!-- <div class="demonstration">All combined</div> -->
      <!-- current-change方法使element-plus封装好的，会给父组件传递电机的页码，相当于把这个参数传递给了getHasTradeMark -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7]"
        :background="true"
        layout=" prev, pager, next, jumper,->,total, sizes,"
        :total="total"
        @size-change="sizeChange"
        @current-change="getHasTrademark"
      />
    </div>
  </el-card>
  <el-dialog
    v-model="dialogFormVisible"
    :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    d
  >
    <el-form
      style="width: 80%"
      :model="trademarkParams"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="品牌名称" prop="tmName" >
        <el-input
          placeholder="请您输入品牌名称"
          v-model="trademarkParams.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          ref="upload"
          :before-upload="beforeAvartarUpload"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
            style="height: 100px; width: 100px"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-button type="primary" size="default" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqHasTrademark, reqDeleteTrademark } from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, UploadProps } from 'element-plus'
let pageNo = ref<number>(1)
//每一页的数据
let limit = ref<number>(3)
//品牌总数
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
let dialogFormVisible = ref<boolean>(false)
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
let formRef = ref()
//品牌名称自定义校验规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称至少为两位'))
  }
}
//品牌LOGO自定义校验规则方法
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('LOGO图片未上传'))
  }
}
//表单校验规则对象
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}

//跳转页数
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
//每页展示数据条数
//这个函数也会返回一个参数，但并不需要这个参数
const sizeChange = async () => {
  getHasTrademark()
}
//挂载完发请求
onMounted(() => {
  getHasTrademark()
})
import type { TradeMark } from '@/api/product/trademark/type'

//上传图片组件
const beforeAvartarUpload: UploadProps['beforeUpload'] = (rawFile:any) => {
  //在图片上传成功之前出发，可以约束文件类型与大小
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件应为PNG|JPG|GIF',
    })
    return false
  }
}
//图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response:any,uploadFile:any) => {
  trademarkParams.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}
import { reqAddOrUpdateTrademark } from '@/api/product/trademark/index'

const confirm = async () => {
  //发请求前对表单进行校验
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  console.log(result)

  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
    dialogFormVisible.value = false
  }
}
//取消按钮的回调
const cancel = () => {
  dialogFormVisible.value = false
}
//添加品牌按钮的回调
const addTrademark = () => {
  dialogFormVisible.value = true
  //清除数据
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  //第一种写法：ts的问号写法
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')

  // nextTick(() => {
  // 	formRef.value.clearValidate('tmName')
  // 	formRef.value.clearValidate('logoUrl')
  // })
}

const updateTrademark = (row: TradeMark) => {
  //清除校验规则错误提示信息
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })

  dialogFormVisible.value = true

  Object.assign(trademarkParams, row)
}

//气泡确认删除
const removeTradeMark = async (id: number) => {
  let result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>
<style lang="scss" scoped>
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
