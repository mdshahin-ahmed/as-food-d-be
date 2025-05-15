import { Types } from 'mongoose'

export interface IBalance {
  user: Types.ObjectId
  type: 'cash'
  amount: number
  prevBalance: number
  newBalance: number
  status: 'approved'
  userId: string
}
