//品牌管理模块的接口
import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'
//品牌管理模块接口地址

enum API {
  //添加品牌
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',

  //修改已有品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  //删除品牌
  DELETE_URL = '/admin/product/baseTrademark/remove/',
}
//page:获取第几页
//limit：获取已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, any>(API.TRADEMARK_URL + `${page}/${limit}`)

//添加和修改已有品牌借口
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    //修改
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    //新增
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
//删除品牌的数据

export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id)
