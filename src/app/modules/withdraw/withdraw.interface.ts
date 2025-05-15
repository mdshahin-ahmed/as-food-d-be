import { Types } from 'mongoose'

export interface IWithdraw {
  user: Types.ObjectId
  amount: number
  status: 'pending' | 'approved' | 'canceled'
}
