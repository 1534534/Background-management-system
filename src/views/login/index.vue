<!--  -->
<template>
  <div class="login_container">
    <el-row :gutter="20">
      <el-col :span="12">占位</el-col>
      <el-col :span="12">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
let useStore = useUserStore()
import { useRouter, useRoute } from 'vue-router'
let $router = useRouter()
let $route = useRoute()
import { getTime } from '@/utils/time'

let loading = ref(false)
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
//自定义校验规则
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少为5位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('密码长度至少为5位'))
  }
}
//定义表单校验需要配置对象
const rules = {
  username: [{ trigger: 'change', validator: validatorUserName }],
  password: [{ trigger: 'change', validator: validatorPassword }],
}
let loginForms = ref()
const login = async () => {
  await loginForms.value.validate()
  //通知仓库发起请求
  //请求成功则首页展示数据，失败则弹出登陆失败信息
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    let redirect: any = $route.query.redirect
    //判断登录的时候,路由路径当中是否有query参数，如果有就往query参数挑战，没有跳转到首页
    $router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`,
    })

    loading.value = false
  } catch (error) {
    loading.value = false

    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>
<style scoped lang="scss">
/* @import url(); 引入公共css类 */
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;

  h1 {
    color: white;
    font-size: 40px;
  }

  h2 {
    font-size: 20px;
    color: white;
    margin: 20px 0px;
  }

  .login_btn {
    width: 100%;
  }
}
</style>
