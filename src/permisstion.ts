//路由鉴权：项目当中路由能不能被访问的权限
import router from '@/router'
import setting from './setting'
import nprogress from 'nprogress'
//引入进度条
import 'nprogress/nprogress.css'
//进度条的加载圆圈取消
nprogress.configure({ showSpinner: false })
//获取token
import useUserStore from './store/modules/user'
import pinia from './store'
const userStore = useUserStore(pinia)
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  //网页名
  document.title = `${setting.title}-${to.meta.title}`
  nprogress.start()
  //获取token判断是否登录
  const token = userStore.token
  let username = userStore.username
  //有token已登录
  if (token) {
    if (to.path == '/login') {
      next('/home')
    } else {
      //有用户信息
      if (username) {
        next()
      }
      //无用户信息
      else {
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          userStore.userLogout()

          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  }
  //未登录
  else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
  // next()
})
//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})
