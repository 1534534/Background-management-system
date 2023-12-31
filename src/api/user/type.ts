//登录接口需要携带参数ts类型

export interface loginForm {
  username: string
  password: string
}
//定义全部接口返回数据都有的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

interface dataType {
  token?: string
  message?: string
}

interface userInfo {
  userId: number

  username: string
  password: string
  desc: string

  token: string
}
//定义服务器返回用户信息相关的数据类型
interface user {
  checkUser: userInfo
}
//登录接口返回数据类型·
export interface loginResponseData extends ResponseData {
  data: dataType
}
export interface userResponseData extends ResponseData {
  data: {
    roles: string[]
    buttons: string[]
    routes: string[]
    avatar: string
    name: string
  }
}
//定义用户相关数据的ts类型
//用户登录接口携带参数的ts类型
export interface loginFormData {
  username: string
  password: string
}

//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}



//定义获取用户信息返回数据类型
export interface userInfoReponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
