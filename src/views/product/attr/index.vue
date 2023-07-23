<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <div v-show="scene == 0">
        <el-button @click="addAttr" type="primary" size="default" icon="Plus"
          :disable="categoryStore.c3Id ? false : true">
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0" :data="attrArr">
          <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <!-- row:已有的属性值 -->
            <template #="{ row, $index }">
              <el-tag style="margin: 5px" v-for="(item, index) in row.attrValueList" :key="item.id">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{ row }">
              <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
              <el-popconfirm :title="`你确定删除${row.attrName}?`" width="200px" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="default" icon="Plus" :disable="attrParams.attrName ? false : true"
          @click="addAttrValue">
          添加属性值
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <el-table border style="margin: 10px 0" :data="attrParams.attrValueList">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <!-- 使用ref函数形式，每有一个input就将其存入inputArr -->
              <el-input @blur="toLook(row, $index)" :ref="(vc: any) => (inputArr[$index] = vc)" 
                v-if="row.flag" v-model="row.valueName" placeholder="请您输入属性值名称"></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <!-- <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button> -->
            <template #="{ row, index }"> <el-button type="primary" size="small" icon="Delete"
                @click="attrParams.attrValueList.splice(index, 1)"></el-button></template>

          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="save">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
//组合式API函数
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
//引入获取已有属性值接口
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
//准备一个数组:将来存储对应的组件实例el-input
let inputArr = ref<any>([])
//存储已有的属性和属性值
let attrArr = ref<Attr[]>([])
//scene=0显示table,scene=1显示添加和修改属性结构
let scene = ref<number>(0)
//收集新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})
//监听仓库三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    attrArr.value = []
    if (!categoryStore.c3Id) return
    getAttr()
  },
)
//获取已有的属性和属性值
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)

  if (result.code == 200) {
    attrArr.value = result.data
  }
}
//添加属性按钮的回调
const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '', //新增的属性的名字
    attrValueList: [
      //新增的属性值数组
    ],
    categoryId: categoryStore.c3Id, //三级分类的ID
    categoryLevel: 3, //代表的是三级分类
  })
  //切换为添加与修改属性的结构
  scene.value = 1
}
//添加属性值按钮的回调
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //控制属性值编辑模式和切换模式的切换
  })
  // //获取最后el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
//保存属性值
const save = async () => {
  let result: any = await reqAddOrUpdateAttr(attrParams)
  if ((result.code = 200)) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}
//取消按钮回调
const cancel = () => {
  scene.value = 0
}
//属性值div点击事件变为编辑模式
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  //nextTick:响应式数据发生变化时，获取更新的DOM(组件实例)
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
//失去焦点变为查看模式
const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() == '') {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })

  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = false
}
//属性修改
const updateAttr = (row: Attr) => {
  scene.value = 1
  //ES6对象的合并

  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
//属性删除
const deleteAttr = async (attrId: number) => {
  let result: any = await reqRemoveAttr(attrId)

  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
//路由组件销毁时，清空仓库分类相关数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>
<style lang="scss" scoped></style>
