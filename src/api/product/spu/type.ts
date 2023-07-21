export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//SPU数据的ts类型：已修改
export interface SpuData {
  category3Id: string | number
  id?: number
  spuName: string
  tmId: number | string
  description: string
  spuImageList: null | SpuImg[]
  spuSaleAttrList: null | SaleAttr[]
}
//已有SPU数据类型
export type Records = SpuData[]
//定义获取已有的的SPU接口返回的数据ts类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
//品牌数据的TS类型
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}
//品牌接口返回数据来的ts类型
export interface AllTradeMark extends ResponseData {
  data: Trademark[]
}
//商品图片的ts类型
export interface SpuImg {
  id?: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  spuId?: string
  name?: string
  url?: string
}
//已有的SPU的照片墙数据类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}
//已有的全部SPU返回数据类型
export interface HasSaleAttr {
  id: number
  name: string
}
//SPU已有的销售属性接口返回数据ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}
//销售属性对象ts类型
export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: string
  flag?: boolean
  saleAttrValue?: string
}
//SPU已有的销售属性接口返回数据ts类型
export interface spuSaleAttrValueList extends ResponseData {
  data: SaleAttr[]
}
export interface Attr {
  attrId: number | string
  valueId: number | string
}
export interface saleArr {
  saleAttrId: number | string
  saleAttrValue: number | string
}

export interface SkuData {
  category3Id: string | number
  spuId: string | number
  tmId: string | number
  skuName: string
  price: string | number
  weight: string | number
  skuDesc: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg: string
}

export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}
