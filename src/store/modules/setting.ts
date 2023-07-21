//layout组件配置仓库
import { defineStore } from 'pinia'
let useLayOutSetingStore = defineStore('defineStore', {
  state: () => {
    return {
      fold: false, //控制菜单折叠或收起
      refresh: true, //控制刷新效果
    }
  },
})

export default useLayOutSetingStore
