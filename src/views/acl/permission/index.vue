<template>
  <el-table :data="PermisstionArr" row-key="id" border style="width: 100%; margin-bottom: 20px;">
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template #="{ row, $index }">
        <el-button type="primary" size="small" :disable="row.level == 4 ? 'true' : 'false'" @click="addPermisstion(row)">{{
          row.level == 4 ?
          '添加功能' : '添加菜单'
        }}</el-button>
        <el-button type="primary" size="small" :disable="row.level == 1 ? 'true' : 'false'"
          @click="updatePermisstion(row)">编辑</el-button>
        <el-popconfirm :title="`你确定要删除${row.name}`" width="260px" @comfirm="removeMenu(row.id)">
          <template #reference> 
            <el-button type="primary" size="small" :disable="row.level == 1 ? 'true' : 'false'"
              @click="removeMenu(row.id)">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜单' : '添加菜单'">
    <el-form>
      <el-form-item label="名称">
        <el-input placeholder="请您输入菜单名称" v-model="menuData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input placeholder="请您输入权限数值" v-model="menuData.code"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { reqAllPermisstion, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/menu/index'
import { PermisstionList, PermisstionResponseData, MenuParams, Permisstion } from '@/api/acl/menu/type'
import  {ElMessage}  from 'element-plus';
let PermisstionArr = ref<PermisstionList>([])
let menuData = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})
let dialogVisible = ref<boolean>(false)
onMounted(() => {
  getHasPermisstion()
})
const getHasPermisstion = async () => {
  let result: PermisstionResponseData = await reqAllPermisstion()
  if (result.code == 200) {
    PermisstionArr.value = result.data
  }

}
//添加菜单按钮的回调
const addPermisstion = (row: Permisstion) => {
  Object.assign(menuData, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  dialogVisible.value = true
  menuData.level = row.level + 1
  menuData.pid = row.id as number
}
//编辑已有的菜单
const updatePermisstion = (row: Permisstion) => {
  dialogVisible.value = true
  Object.assign(menuData, row)
}
//确定
const save = async () => {
  let result: any = await reqAddOrUpdateMenu(menuData)
  console.log(result);
  if (result.code == 200) {
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: menuData ? '更新成功' : '添加成功'
    })

  }

  getHasPermisstion()
}

//删除
const removeMenu = async (id: number) => {
  let result = await reqRemoveMenu(id)
  console.log(result);

  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getHasPermisstion()
  }
}
</script>
<style lang="scss" scoped></style>
