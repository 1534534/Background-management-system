<template>
  <div>
    <el-card style="height: 80px">
      <el-form label-width="80px"  :inline="true">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入用户名" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item label="" >
          <el-button type="primary" size="default" :disabled="keyword ? false : true" @click="search">搜索</el-button>
          <el-button type="primary" size="default" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" style="margin: 20px 0;">
      <el-button type="primary" size="default" @click="addUser">
        添加用户
      </el-button>
      <el-button type="primary" size="default" @click="deleteSalectUser"
        :disabled="selectIdArr.length ? false : true">批量删除</el-button>
      <el-table @selection-change="selectChange" :data="userArr" border stripe style="margin: 10px 0">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" type="index" align="center"></el-table-column>
        <el-table-column label="id" prop="id" align="center"></el-table-column>
        <el-table-column label="用户名字" prop="name" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户名称" prop="username" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户角色" prop="roleName" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" prop="createTime" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>

            <el-popconfirm :title="`你确定删除${row.username}`" @confirm="deleteUser(row.id)">
              <template #reference> <el-button type="primary" size="small" icon="Delete" @click="">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer v-model="drawer">
        <template #header>
          <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
        </template>
        <template #default>
          <el-form :model="userParams" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名" prop="username">
              <el-input placeholder="请您输入用户姓名" prop="username" v-model="userParams.username"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称">
              <el-input placeholder="请您输入用户昵称" prop="name" v-model="userParams.name"></el-input>
            </el-form-item>
            <el-form-item prop="password" v-if="!userParams.id" label="用户密码">
              <el-input placeholder="请您输入用户密码" v-model="userParams.password"></el-input>
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
      <el-drawer v-model="drawer1">
        <el-form-item label="用户姓名">
          <el-input v-model="userParams.username" :disabled="true"></el-input>

        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox @change:any="handleCheckAllChange" :indeterminate="isIndeterminate" v-model="checkAll">全选</el-checkbox>
          <el-checkbox-group v-model:any="userRole" @change:any="handleCheckedCitiesChange">
            <el-checkbox v-for="(role, index) in allRole" :key="role.id" :label="role">{{ role.roleName }}</el-checkbox>
          </el-checkbox-group>
         
        </el-form-item>
        <!-- 职位的复选框 -->
        <el-button type="primary" size="default" @click="confirmClick">确定</el-button>
        <el-button type="primary" size="default" @click="drawer1 = false">取消</el-button>

      </el-drawer>
    </el-card>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7]" :background="true"
      layout=" prev, pager, next, jumper,->,total, sizes," :total="total" />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import type { Records, UserResponseData, User, AllRole, AllRoleResponseData, SetRoleData } from '@/api/acl/user/type.ts'
import { reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole, reqRemoveUser, reqSelectUser } from '@/api/acl/user/index'
import  {ElMessage} from 'element-plus'
//用户总个数
let total = ref<number>(0)
//纯粹全部用户的数组
let userArr = ref<Records>([])
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let formRef = ref<any>()
let keyword = ref<string>('')
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
let drawer = ref<boolean>(false)
let drawer1 = ref<boolean>(false)
onMounted(() => {
  getHasUser()
})
//获取全部已有的用户信息
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value, keyword.value)
  console.log(result);

  if (result.code == 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}
//保存按钮的回调
const save = async () => {
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateUser(userParams)
  console.log(result);

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
//收集顶部复选框全选数据
let checkAll = ref<boolean>()
//控制顶部全选复选框不确定的样式
let isIndeterminate = ref<boolean>(false)
//存储全部职位的数据
let allRole = ref<AllRole>([])
let userRole = ref<AllRole>([])
//当前角色已有的职位
const setRole = async (row: User) => {
  Object.assign(userParams, row)
  let result: AllRoleResponseData = await reqAllRole(userParams.id as number)
  if (result.code == 200) {
    //存储全部职位
    allRole.value = result.data.allRolesList
    //存储当前用户已有的职位
    userRole.value = result.data.assignRoles

    drawer1.value = true
  }
}
//
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
//全选复选框触发全选按钮事件
const handleCheckedCitiesChange = (value: string[]) => {
  checkAll.value = value.length === allRole.value.length
  isIndeterminate.value = value.length !== allRole.value.length
}
//确定按钮回调
const confirmClick = async () => {
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => {
      return item.id as number
    })
  }
  let result: any = await reqSetUserRole(data)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '分配成功',
    })
    drawer1.value = false
    getHasUser(pageNo.value)
  }
}
//准备一个数组存储批量删除的用户的ID
let selectIdArr = ref<User[]>([]);
const selectChange = (value: any) => {
  selectIdArr.value = value

}
//删除
const deleteUser = async (userId: number) => {
  let result: any = await reqRemoveUser(userId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)

  }
}
//批量删除
const deleteSalectUser = async () => {
  let idsList: any = selectIdArr.value.map((item) => {
    return item.id
  })
  let result: any = await reqSelectUser(idsList)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '批量删除成功',
    })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)

  }
}
//搜索按钮回调
const search = () => {
  getHasUser()
  keyword.value = ''
}
import useLayOutSetingStore from '@/store/modules/setting'
let settingStore = useLayOutSetingStore()
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
</script>
<style lang="scss" scoped></style>
