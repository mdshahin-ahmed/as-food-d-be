import { JwtPayload } from 'jsonwebtoken'
import { Expense } from './expense.model'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/app.error'
import httpStatus from 'http-status'

const addExpenseIntoDB = async (payload: {
  amount: number
  description: 'string'
}) => {
  const result = await Expense.create(payload)
  return result
}

const getExpenseListFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  // const result = await Order.find({}).populate('user', 'name')
  // return result
  const statementQuery = new QueryBuilder(Expense.find(), query, user)
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await statementQuery.countTotal()
  const result = await statementQuery.modelQuery

  return {
    meta,
    result,
  }
}

const updateExpense = async (
  id: string,
  payload: { amount: number; description: string },
) => {
  const isExpenseExist = await Expense.findById(id)
  if (!isExpenseExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Expense not found',
      'Expense not found!',
    )
  }

  const result = await Expense.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const expenseServices = {
  addExpenseIntoDB,
  getExpenseListFromDB,
  updateExpense,
}
