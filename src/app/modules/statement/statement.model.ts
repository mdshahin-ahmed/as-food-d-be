import { model, Schema } from 'mongoose'
import { IStatement } from './statement.interface'

const statementSchema = new Schema<IStatement>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['nagad', 'bkash'],
      required: true,
    },
    transactionNumber: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    exactAmount: {
      type: Number,
      required: true,
    },
    mobile: {
      type: String,
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
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
)

export const Statement = model<IStatement>('Statement', statementSchema)
