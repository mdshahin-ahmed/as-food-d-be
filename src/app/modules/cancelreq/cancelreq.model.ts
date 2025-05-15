import { model, Schema } from 'mongoose'
import { ICancelReq } from './cancelreq.interface'

const cancelReqSchema = new Schema<ICancelReq>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mealName: {
      type: String,
      required: true,
    },
    mealType: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
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

export const CancelReq = model<ICancelReq>('CancelReq', cancelReqSchema)
