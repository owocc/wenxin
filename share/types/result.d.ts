import type { Result } from './global'
import type { User } from '../prisma/client'
export type authResult = {
  user: User
  token: string
}
