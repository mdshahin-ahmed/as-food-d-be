import { model, Schema } from 'mongoose'
import { IOrder } from './order.interface'

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    uId: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'delivered', 'canceled'], // Only allow these values
      default: 'pending', // Default value
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Order = model<IOrder>('Order', orderSchema)
