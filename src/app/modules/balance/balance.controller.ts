import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { balanceServices } from './balance.service'
import sendResponse from '../../utils/sendResponse'

const addBalanceIntoDB = catchAsync(async (req: Request, res: Response) => {
  const data = req?.body
  const result = await balanceServices.addBalanceIntoDB(data)

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Balance added successfully',
    data: result,
  })
})

const getBalanceFromDB = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const user = req.user
  const result = await balanceServices.getBalanceFromDB(query, user)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Balanced retrieved successfully',
    data: result,
  })
})

export const balanceController = {
  addBalanceIntoDB,
  getBalanceFromDB,
}
