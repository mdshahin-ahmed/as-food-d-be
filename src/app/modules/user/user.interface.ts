import { Types } from 'mongoose'
import { ROLE } from './user.constant'

export interface IUser {
  name: string
  email: string
  mobile: string
  area: Types.ObjectId
  address: string
  password: string
  userId: string
  imageUrl: string
  bill: number
  isActive: boolean
  role: 'admin' | 'employee' | 'user'
}

export type TRole = keyof typeof ROLE
