import { JwtVerifyResult } from './dto'

declare namespace Express {
  export interface Request {
    user?: JwtVerifyResult
  }
}
