import request from '@/utils/request'

import type {
  SkuData,
  SkuInfoData,
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  HasSaleAttrResponseData,
} from './type'
enum API {
  HASSPU_URL = '/admin/product/',
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  IMAGE_URL = '/admin/product/spuImageList/',
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',

  //增加新的spu
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  SKUINFO_URL = '/admin/product/findBySpuId/',
  REMOVESPU_URL = '/admin/product/deleteSpu/',
}

export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number,
) => {
  return request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
}
//获取全部的SPU品牌的数据
export const reqAllTradeMark = () => {
  return request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)
}
//获取某一个已有的SPU商品的图片地址
export const reqSpuImageList = (spuId: number) => {
  return request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)
}
//获取全部的销售属性
export const reqAllSaleAttr = () => {
  return request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
}
//获取已有的Spu拥有的销售属性
export const reqSpuHasSaleAttr = (spuId: number) => {
  return request.get<any, HasSaleAttrResponseData>(
    API.SPUHASSALEATTR_URL + spuId,
  )
}
//
export const reqAddOrUpdateSpu = (data: any) => {
  //有id则更新已有的SPU
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}
//添加新的SKU
export const reqAddSku = (data: SkuData) => {
  return request.post<any, any>(API.ADDSKU_URL, data)
}
//获取SKU数据接口的ts类型
export const reqSkuList = (spuId: number | string) => {
  return request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId)
}
export const reqRemoveSpu = (spuId: number | string) => {
  return request.delete<any, any>(API.REMOVESPU_URL + spuId)
}
