import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BillServices } from './bill.service'

const createBillIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BillServices.createBillIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Bill created successfully!',
    data: result,
  })
})
const getBillsFromDB = catchAsync(async (req: Request, res: Response) => {
  const type = req?.query
  const result = await BillServices.getBillsFromDB(type)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Bills retrieved successfully!',
    data: result,
  })
})
// const getSingleBillFromDB = catchAsync(async (req: Request, res: Response) => {
//   const params = req?.params?.id
//   const result = await BillServices.getSingleBillFromDB(params)
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'Bill retrieved successfully!',
//     data: result,
//   })
// })

const updateBillIntoDB = catchAsync(async (req: Request, res: Response) => {
  const params = req?.params?.id
  const payload = req?.body
  const result = await BillServices.updateBillIntoDB(params, payload)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Bill updated successfully!',
    data: result,
  })
})

// const deleteBillFromDB = catchAsync(async (req: Request, res: Response) => {
//   const params = req?.params?.id
//   const result = await BillServices.deleteBillFromDB(params)
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.NO_CONTENT,
//     message: 'Bills deleted successfully!',
//     data: result,
//   })
// })

export const BillControllers = {
  createBillIntoDB,
  getBillsFromDB,
  // getSingleBillFromDB,
  updateBillIntoDB,
  // deleteBillFromDB,
}
