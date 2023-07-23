export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

export interface RoleData {
    id?: number
    createTime?: string
    updateTime?: string
    roleName: string
    remaark?: null
}

export type Records = RoleData[]
export interface RoleResponseData extends ResponseData {
    data: {
        records: Records
        total: number
        size: number
        current: number
        order: []
        optimizeCountSql: boolean
        hitCount: boolean
        countId: null
        maxLimit: null
        pages: number
    }
}
//菜单元年数据的ts类型
export interface MenuData {
    id: number
    createTime: string
    updateTime: string
    pid: number
    name: string
    code: string
    toCode: string
    type: number
    status: null
    level: number
    children?: MenuList
    select: boolean
}
export type MenuList = MenuData[]

//菜单权限与按钮权限数据的ts类型
export interface MenuResponseData extends ResponseData {
    data: MenuList
}
