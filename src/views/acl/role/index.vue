<template>
  <el-card>
    <el-form label-width="80px"  :inline="true">
      <el-form-item label="角色名称:">
        <el-input placeholder="请输入角色名称" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item label="" >
        <el-button type="primary" size="default" :disabled="keyword ? false : true" @click="search">搜索</el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 20px 0;">
    <el-button type="primary" size="default" icon="Plus" @click="addRole">
      添加职位
    </el-button>
    <el-table border style="margin: 20px 0;" :data="records">
      <el-table-column label="#" type="index" align="center"></el-table-column>
      <el-table-column label="ID" prop="id" align="center"></el-table-column>
      <el-table-column label="角色名称" prop="roleName" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template #="{ row, index }">
          <el-button type="primary" size="small" icon="User" @click="setPermisstion(row)">分配权限</el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>

          <el-popconfirm :title="`你确定要删除${row.roleName}`" @confirm="remove(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 添加和更新 -->
  <el-dialog v-model="dialogVisite" :title="RoleParams.id ? '更新职位' : '添加职位'">
    <el-form :model="RoleParams" :rules="rules" ref="form">
      <el-form-item label="职位名称" prop="roleName">
        <el-input placeholder="请您输入职位名称" v-model="RoleParams.roleName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">立即添加</el-button>
      <el-button @click="dialogVisite = false">取消</el-button>
    </template>

  </el-dialog>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配菜单与按钮权限</h4>
    </template>
    <template #default>
      <el-tree ref="tree" :data="menuArr" show-checkbox node-key="id" default-expand-all :default-checked-keys="selectArr"
        :props="defaultProps"></el-tree>

    </template>
    <template #footer>
      <div style="flex:auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="handler">确定</el-button>

      </div>
    </template>
  </el-drawer>

  <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7]" :background="true"
    layout=" prev, pager, next, jumper,->,total, sizes," :total="total" />
</template>
<script lang="ts" setup>
import { reqAllRoleList, reqAddOrUpdateRole, reqSetPermisstion, reqAllMenuList, reqRemoveRole } from '@/api/acl/role/index'
import type { RoleResponseData, Records, RoleData, MenuResponseData, MenuList } from '@/api/acl/role/type'
import { nextTick, onMounted, ref, reactive } from 'vue'
import useLayOutSetingStore from '@/store/modules/setting'
import  {ElMessage}  from 'element-plus';
let settingStore = useLayOutSetingStore()
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let keyword = ref<string>('')
let total = ref<number>()
let records = ref<Records>([])
let dialogVisite = ref<boolean>(false)
let drawer = ref<boolean>()
//准备一个数组:数组用于存储勾选的节点的ID(四级的)
let selectArr = ref<number[]>([]);
//定义数组存储用户权限的数据
let menuArr = ref<MenuList>([]);
//收集用户信息的响应式数据
//存储全部已有的职位
let allRole = ref<Records>([]);
let RoleParams = reactive<RoleData>({
  roleName: ''
})
//获取form组件实例
let form = ref<any>();
//自定义校验规则
const validatorRoleName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  }
  else {
    callBack(new Error('职位名称至少为两位数'))
  }

}
//职场校验规则
const rules = {
  roleName: [
    { required: true, trigger: 'blur', validator: validatorRoleName }
  ]
}

onMounted(() => {
  getHasRole()
})
//获取职位数据
const getHasRole = async (pager = 1) => {
  pageNo.value = pager
  let result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
  if (result.code == 200) {
    total.value = result.data.total
    records.value = result.data.records
  }

}
//搜索按钮回调
const search = () => {
  getHasRole()
  keyword.value = ''
}
//重置按钮回调
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}
//添加职位
const addRole = () => {
  dialogVisite.value = true
  //清空数据
  Object.assign(RoleParams, {
    roleName: '',
    id: 0
  })
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
//更新职位
const updateRole = (row: RoleData) => {
  dialogVisite.value = true
  Object.assign(RoleParams, row)
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}

const save = async () => {
  await form.value.validate()
  let result: any = await reqAddOrUpdateRole(RoleParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: RoleParams.id ? '更新成功' : '添加成功'
    })
    dialogVisite.value = false
    getHasRole(RoleParams.id ? pageNo.value : 1)
  }
}
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr;
}
//树形控件册数数据
const defaultProps = {
  children: 'children',
  label: 'name'
}
//获取菜单和按钮权限
const setPermisstion = async (row: RoleData) => {
  drawer.value = true
  Object.assign(RoleParams, row)
  let result: MenuResponseData = await reqAllMenuList(RoleParams.id as number);
  console.log(result);
  if (result.code == 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}
//获取tree组件实例
let tree = ref<any>();
const handler = async () => {
  const roleId = RoleParams.id as number
  let arr = tree.value.getCheckedKeys()
  let arr1 = tree.value.getHalfCheckedKeys()
  let permissionId = arr.concat(arr1)
  let result: any = await reqSetPermisstion(roleId, permissionId)
  console.log(result);
  if (result.code == 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: '分配权限成功'
    })
    //页面刷新
    window.location.reload()
  }
}
//删除
const remove = async (id: number) => {
  let result: any = await reqRemoveRole(id)
  console.log(result);
  if (result.code = 200) {
    ElMessage({
      type: 'success',
      message: "删除成功",
    })
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }

}


</script>
<style lang="scss" scoped></style>
