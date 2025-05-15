import { model, Schema } from 'mongoose'
import { IWithdraw } from './withdraw.interface'

const withdrawSchema = new Schema<IWithdraw>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'canceled', 'approved'],
      default: 'pending',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Withdraw = model<IWithdraw>('Withdraw', withdrawSchema)
