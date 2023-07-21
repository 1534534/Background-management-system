export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//定义SKU对象的ts类型
export interface Attr {
  id?: number
  attrId: number | string
  valueId: number | string
}
export interface saleArr {
  id?: number
  saleAttrId: number | string
  saleAttrValueId: number | string
}
export interface SkuData {
  category3Id?: string | number
  spuId?: string | number
  tmId?: string | number
  skuName?: string
  price?: string | number
  weight?: string | number
  skuDesc?: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg?: string
  isSale?: number
  id?: number
}

export interface SkuResponseData extends ResponseData {
  data: {
    record: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSpl: boolean
    hitCountId: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
//sku商品详情接口
export interface SkuInfoData extends ResponseData {
  data: SkuData
}
