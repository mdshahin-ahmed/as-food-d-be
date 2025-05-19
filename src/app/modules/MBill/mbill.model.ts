import { model, Schema } from 'mongoose'
import { IMBill } from './mbill.interface'

const orderSchema = new Schema<IMBill>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bill: {
      type: Schema.Types.ObjectId,
      ref: 'Bill',
      required: true,
    },
    paidBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    mobile: {
      type: String,
      required: true,
    },
    monthName: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },

    userId: { type: String, required: true },
    status: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['pending', 'paid', 'approve', 'cancel'],
    },
  },
  {
    timestamps: true,
  },
)

export const MBill = model<IMBill>('MBill', orderSchema)
