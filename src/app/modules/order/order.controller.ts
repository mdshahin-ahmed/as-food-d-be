import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { orderServices } from './order.service'

const createOrderIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user
  const id = req?.query?.id as string
  const result = await orderServices.createOrderIntoDB(user, id)

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Order created successfully',
    data: result,
  })
})

const getOrdersFromDB = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const user = req.user
  const result = await orderServices.getOrdersFromDB(query, user)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order retrieved successfully',
    data: result,
  })
})

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id
  const status = req.body

  const result = await orderServices.updateOrderStatus(id, status)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order updated successfully',
    data: result,
  })
})

const cancelOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id
  const status = req.body

  const result = await orderServices.cancelOrder(id, status)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order canceled successfully',
    data: result,
  })
})

export const orderControllers = {
  createOrderIntoDB,
  getOrdersFromDB,
  updateOrderStatus,
  cancelOrder,
}
