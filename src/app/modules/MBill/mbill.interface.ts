import { Types } from 'mongoose'

export interface IMBill {
  user: Types.ObjectId
  bill: Types.ObjectId
  paidBy: Types.ObjectId
  monthName: string
  userId: string
  mobile: string
  area: string
  status: 'pending' | 'paid' | 'approve' | 'cancel'
}
