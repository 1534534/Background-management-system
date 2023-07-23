//用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import type { loginForm, loginResponseData, userInfoReponseData } from '@/api/user/type'
import type { UserState } from './types/type.ts'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute, asnycRoute,anyRoute } from '@/router/routes'
import router from '@/router'
//引入深拷贝方法
//@ts-expect-error
import _ from 'lodash'
//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        //硅谷333账号:product\trademark\attr\sku
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //仓库存储生成菜单需要的数组
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  actions: {
    //用户登录
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        //登陆成功
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        localStorage.setItem('TOKEN', result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data as string))
      }
    },
    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储
      const result: userInfoReponseData = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        const userAsyncRoute = filterAsyncRoute(
          _.cloneDeep(asnycRoute),
          result.data.routes,
        )
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
       //退出登录
    async userLogout() {
      const result = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  

  },
  getters: {},
})
export default useUserStore
