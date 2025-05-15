import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { expenseServices } from './expense.service'

const addExpenseIntoDB = catchAsync(async (req: Request, res: Response) => {
  const data = req?.body
  const result = await expenseServices.addExpenseIntoDB(data)

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Expense added successfully',
    data: result,
  })
})

const getExpenseListFromDB = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const user = req.user
  const result = await expenseServices.getExpenseListFromDB(query, user)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Expenses retrieved successfully',
    data: result,
  })
})

const updateExpense = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id
  const payload = req.body

  const result = await expenseServices.updateExpense(id, payload)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Expense updated successfully',
    data: result,
  })
})

export const expenseControllers = {
  addExpenseIntoDB,
  getExpenseListFromDB,
  updateExpense,
}
