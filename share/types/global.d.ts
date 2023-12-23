// 返回数据类型的基本类型
export type Result<T> = {
  code: number
  data?: T
  msg?: string
}
