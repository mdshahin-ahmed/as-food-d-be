import { Types } from 'mongoose'

export interface IOrder {
  user: Types.ObjectId
  name: string
  uId: string
  description: string
  price: number
  type: string
  userId: string
  status: 'pending' | 'delivered' | 'canceled'
}
