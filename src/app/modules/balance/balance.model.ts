import { model, Schema } from 'mongoose'
import { IBalance } from './balance.interface'

const balanceSchema = new Schema<IBalance>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      default: 'cash',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    prevBalance: {
      type: Number,
      required: true,
    },
    newBalance: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'approved',
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Balance = model<IBalance>('Balance', balanceSchema)
