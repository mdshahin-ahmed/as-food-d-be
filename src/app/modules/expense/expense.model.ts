import { model, Schema } from 'mongoose'
import { IExpense } from './expense.interface'

const expenseSchema = new Schema<IExpense>(
  {
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Expense = model<IExpense>('Expense', expenseSchema)
