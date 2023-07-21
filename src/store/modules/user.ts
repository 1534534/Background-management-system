//用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type.ts'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //仓库存储生成菜单需要的数组
      username: '',
      avatar: '',
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
      const result = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
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
