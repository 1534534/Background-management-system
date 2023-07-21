<template>
  <div>
    <el-card style="height: 80px">
      <el-form label-width="80px" size="normal" :inline="true">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="" size="normal">
          <el-button type="primary" size="default" @click="">搜索</el-button>
          <el-button type="primary" size="default" @click="">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-button type="primary" size="default" @click="addUser">
        添加用户
      </el-button>
      <el-button type="primary" size="default" @click="">批量删除</el-button>
      <el-table :data="userArr" border stripe style="margin: 10px 0">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          label="#"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="id" prop="id" align="center"></el-table-column>
        <el-table-column
          label="用户名字"
          prop="name"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户名称"
          prop="username"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户角色"
          prop="roleName"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="300px"
        ></el-table-column>
      </el-table>
      <el-drawer v-model="drawer">
        <template #header>
          <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
        </template>
        <template #default>
          <el-form :model="userParams" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名" prop="username">
              <el-input
                placeholder="请您输入用户姓名"
                prop="username"
                v-model="userParams.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户昵称">
              <el-input
                placeholder="请您输入用户昵称"
                prop="name"
                v-model="userParams.name"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              v-if="!userParams.id"
              label="用户密码"
            >
              <el-input
                placeholder="请您输入用户密码"
                v-model="userParams.password"
              ></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button type="primary" @click="cancel">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
          </div>
        </template>
      </el-drawer>
    </el-card>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7]"
      :background="true"
      layout=" prev, pager, next, jumper,->,total, sizes,"
      :total="total"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import type { Records, UserResponseData, User } from '@/api/acl/user/type.ts'
import { reqUserInfo, reqAddOrUpdateUser } from '@/api/acl/user/index'
import { ElMessage } from 'element-plus'

//用户总个数
let total = ref<number>(0)
//纯粹全部用户的数组
let userArr = ref<Records>([])
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let formRef = ref<any>()
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
let drawer = ref<boolean>(false)
onMounted(() => {
  getHasUser()
})
//获取全部已有的用户信息
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value)
  console.log(result)
  if (result.code == 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}
//保存按钮的回调
const save = async () => {
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateUser(userParams)
  if (result.code == 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    getHasUser(userParams.id ? pageNo.value : 1)
    //浏览器自动刷新一下
    window.location.reload()
  } else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败',
    })
  }
}
//添加用户按钮
const addUser = () => {
  drawer.value = true

  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
const cancel = () => {
  drawer.value = false
}
//校验用户名字回调
const validatorUsername = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户名字至少五位'))
  }
}
const validatorName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户昵称至少五位'))
  }
}
const validatorPassword = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户密码至少五位'))
  }
}
//表单校验规则
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}
//更新用户
const updateUser = (row: User) => {
  drawer.value = true
  Object.assign(userParams, row)
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}
</script>
<style lang="scss" scoped></style>
