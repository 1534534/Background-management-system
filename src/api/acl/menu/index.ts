import request from '@/utils/request'
import type { PermisstionResponseData, MenuParams } from './type'

enum API {
    ALLPERMISSTION_URL = "/admin/acl/permission",
    //新增子菜单
    ADDMENU_URL = '/admin/acl/permission/save',
    //更新菜单
    UPDATE_URL = '/admin/acl/permission/update',
    //删除已有的菜单
    DELETEMENU_URL ='/admin/acl/permission/remove/'

}
export const reqAllPermisstion = () => {
    return request.get<any, PermisstionResponseData>(API.ALLPERMISSTION_URL)
}
//新增和更新菜单
export const reqAddOrUpdateMenu = (data: MenuParams) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATE_URL, data)
    }
    else {
        return request.post<any, any>(API.ADDMENU_URL, data)

    }
}
export const reqRemoveMenu = (id:number) => {
    return request.delete<any, any>(API.DELETEMENU_URL+id)
}
