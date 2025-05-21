import { ROLE } from './user.constant'

export interface IUser {
  name: string
  email: string
  mobile: string
  area: string
  address: string
  password: string
  userId: string
  imageUrl: string
  bill: number
  isActive: boolean
  role: 'admin' | 'employee' | 'user'
}

export type TRole = keyof typeof ROLE
