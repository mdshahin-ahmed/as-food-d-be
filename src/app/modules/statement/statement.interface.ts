import { Types } from 'mongoose'

export interface IStatement {
  user: Types.ObjectId
  type: 'nagad' | 'bkash'
  mobile: string
  amount: number
  exactAmount: number
  transactionNumber: string
  prevBalance: number
  newBalance: number
  userId: string
  status: 'pending' | 'approved'
}
