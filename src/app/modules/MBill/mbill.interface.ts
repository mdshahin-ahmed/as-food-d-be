import { Types } from 'mongoose'

export interface IMBill {
  user: Types.ObjectId
  bill: Types.ObjectId
  monthName: string
  userId: string
  mobile: string
  area: string
  employeeId: string
  status: 'pending' | 'paid' | 'approve' | 'cancel'
}
