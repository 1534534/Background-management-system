import request from '@/utils/request'

import { AllRoleResponseData, UserResponseData, User, SetRoleData } from './type'
//枚举地址
enum API {
  ALLUSER_URL = '/admin/acl/user/',
  //添加新用户
  ADDUSER_URL = '/admin/acl/user/save',
  //更新已有用户
  UPDATEUSER_URL = '/admin/acl/user/update',
  //
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  //给已有的用户分配角色接口
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  //删除账号
  DELETEUSER_URL = '/admin/acl/user/remove/',

  //批量删除
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',

}
//获取用户账户
export const reqUserInfo = (page: number, limit: number, username:string) => {
  return request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}/?username=${username}`)
}
//添加和更新用户
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL , data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL , data)
  }
}
//分配职位

export const reqSetUserRole = (data:SetRoleData) => {
  return request.post<any, any>(API.SETROLE_URL ,data)
}

//获取全部职位和包含当前用户的已有的职位
export const reqAllRole = (userId: number) => {
  return request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)
}
//删除账号信息
export const reqRemoveUser = (userId: number) => {
  return request.delete<any, any>(API.DELETEUSER_URL + userId)

}

//批量删除账号信息
export const reqSelectUser = (idList: number[]) => {
  return request.delete(API.DELETEALLUSER_URL, { data: idList })

}