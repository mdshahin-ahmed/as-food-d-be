import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { mBillServices } from './mbill.service'

const createMBillIntoDB = catchAsync(async (req: Request, res: Response) => {
  // const user = req?.user
  // const data = req?.body
  const result = await mBillServices.createMBillIntoDB()

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Bill created successfully',
    data: result,
  })
})

const getMBillFromDB = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const user = req.user
  const result = await mBillServices.getMBillFromDB(query, user)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Monthly Bill retrieved successfully',
    data: result,
  })
})
const getPendingMBillFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query
    const user = req.user
    const result = await mBillServices.getMBillFromDB(query, user)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Monthly Bill successfully',
      data: result,
    })
  },
)

const updateBillStatusPaid = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id
  const payload = req.body
  const user = req.user

  const result = await mBillServices.updateBillStatusPaid(id, payload, user)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Bill Paid',
    data: result,
  })
})
const updateBillStatusApprove = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body
    const user = req.user

    const result = await mBillServices.updateBillStatusApprove(data, user)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Bill Approved',
      data: result,
    })
  },
)

export const mBillControllers = {
  createMBillIntoDB,
  getMBillFromDB,
  updateBillStatusPaid,
  updateBillStatusApprove,
  getPendingMBillFromDB,
}
