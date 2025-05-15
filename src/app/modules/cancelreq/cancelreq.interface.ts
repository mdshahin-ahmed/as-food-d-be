import { Types } from 'mongoose'

export interface ICancelReq {
  user: Types.ObjectId
  mealType: string
  mealName: string
  reason: string
  status: 'pending' | 'approved' | 'canceled'
}
