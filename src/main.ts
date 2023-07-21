import { createApp } from 'vue'
import '@/styles/index.scss'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//element-plus国际化
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './permisstion'
const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
// 引入路由
import router from '@/router'
// 注册模板路由
app.use(router)
// 引入仓库
import pinia from '@/store'
// 注册仓库
app.use(pinia)

//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象
import allGloablComponent from './components/index'
app.use(allGloablComponent)
app.mount('#app')
