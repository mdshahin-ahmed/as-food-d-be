import { model, Schema } from 'mongoose'
import { IBill } from './bill.interface'

const BillSchema = new Schema<IBill>(
  {
    monthName: {
      type: String,
      required: true,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Bill = model<IBill>('Bill', BillSchema)
