import request from '@/utils/request'

import type { userResponseData, User } from '@/api/user/type'
import { UserResponseData } from './type'
//枚举地址
enum API {
  ALLUSER_URL = '/admin/acl/user/',
  //添加新用户
  ADDUSER_URL = '/admin/acl/user/save',
  //更新已有用户
  UPDATEUSER_URL = '/admin/acl/user/update',
}
//获取用户账户
export const reqUserInfo = (page: number, limit: number) => {
  return request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}`,
  )
}
//添加和更新用户
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL + data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL + data)
  }
}
