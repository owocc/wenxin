import type { Result as ResultData } from '../../../share/types/global'

export class Result<T> {
  //   封装返回数据
  constructor(public code: number, public msg: string, public data: T) {}

  // 成功
  static success<T>(data: T, msg = '成功'): ResultData<T> {
    return new Result(200, msg, data)
  }

  // 失败
  static fail(
    code = 400,
    msg = '失败',
    data: unknown = null
  ): ResultData<unknown> {
    return new Result(code, msg, data)
  }
}
