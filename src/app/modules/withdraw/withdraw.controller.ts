import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { withdrawServices } from './withdraw.service'

const createWithdrawReq = catchAsync(async (req: Request, res: Response) => {
  const user = req.user
  const result = await withdrawServices.createWithdrawReqIntoDB(user, req.body)
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Withdraw request added successfully',
    data: result,
  })
})
const getWithdrawRequest = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const user = req.user
  const result = await withdrawServices.getWithdrawRequestFromDB(query, user)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Withdraw retrieved successfully',
    data: result,
  })
})

const approveWithdrawReq = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id

  const result = await withdrawServices.approveWithdrawReq(id)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Withdraw approved successfully',
    data: result,
  })
})
const cancelWithdrawReq = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id

  const result = await withdrawServices.cancelWithdrawReq(id)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Withdraw canceled successfully',
    data: result,
  })
})

export const withdrawControllers = {
  createWithdrawReq,
  getWithdrawRequest,
  approveWithdrawReq,
  cancelWithdrawReq,
}
