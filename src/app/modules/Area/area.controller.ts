import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { areaServices } from './area.service'

const createAreaIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user
  const data = req?.body
  const result = await areaServices.createAreaIntoDB(data, user)

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Area created',
    data: result,
  })
})

const getAreasFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await areaServices.getAreasFromDB()

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order retrieved successfully',
    data: result,
  })
})

export const areaControllers = {
  createAreaIntoDB,
  getAreasFromDB,
}
