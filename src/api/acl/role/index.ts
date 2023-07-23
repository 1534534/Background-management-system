import request from "@/utils/request";
import type { RoleResponseData, RoleData, MenuResponseData } from './type'
enum API {
    //获取职位
    ALLROLE_URL = '/admin/acl/role/',
    //新增职位
    ADDROLE_URL = '/admin/acl/role/save',
    //更新职位
    UPDATE_URL = '/admin/acl/role/update',
    //获取全部菜单和按钮的数据
    ALLPERMISSTION = '/admin/acl/permission/toAssign/',
    //给对应的职位分配权限
    SETPERMISTION_URL = '/admin/acl/permission/doAssign/?',
    //删除已有的职位
    REMOVEROLE_URL = '/admin/acl/role/remove/', 


}
//获取职位
export const reqAllRoleList = (page: number, limit: number, roleName: string) => {
    return request.get<any, RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`)
}
//添加更新职位
export const reqAddOrUpdateRole = (data: RoleData) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATE_URL, data)
    }
    else {
        return request.post<any, any>(API.ADDROLE_URL, data)

    }
}
//获取全部菜单与按钮权限数据
export const reqAllMenuList = (roleId: number) => {
    return request.get<any, MenuResponseData>(API.ALLPERMISSTION + roleId)
}
//给对应的职位分配权限
export const reqSetPermisstion = (roleId: number, permissionId: number[]) => {

    return request.post(API.SETPERMISTION_URL + `roleId=${roleId}&permissionId=${permissionId}`)

}
export const reqRemoveRole = (roleId: number) => {
    return request.delete<any, any>(API.REMOVEROLE_URL + roleId)
}


