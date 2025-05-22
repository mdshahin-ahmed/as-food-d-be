import { Types } from 'mongoose'

export interface IMBill {
  user: Types.ObjectId
  bill: Types.ObjectId
  paidBy: Types.ObjectId
  approvedBy: Types.ObjectId
  area: Types.ObjectId
  monthName: string
  userId: string
  mobile: string
  status: 'pending' | 'paid' | 'approve' | 'cancel'
}
