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
    message: 'Order retrieved successfully',
    data: result,
  })
})

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

// const cancelOrder = catchAsync(async (req: Request, res: Response) => {
//   const id = req?.params?.id
//   const status = req.body

//   const result = await orderServices.cancelOrder(id, status)

//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'Order canceled successfully',
//     data: result,
//   })
// })

export const mBillControllers = {
  createMBillIntoDB,
  getMBillFromDB,
  updateBillStatusPaid,
  // cancelOrder,
}
