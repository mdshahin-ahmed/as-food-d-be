import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { mealServices } from './meal.service'
import httpStatus from 'http-status'

const createMealIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await mealServices.createMealIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Meal created successfully!',
    data: result,
  })
})
const getMealsFromDB = catchAsync(async (req: Request, res: Response) => {
  const type = req?.query
  const result = await mealServices.getMealsFromDB(type)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Meals retrieved successfully!',
    data: result,
  })
})
const getSingleMealFromDB = catchAsync(async (req: Request, res: Response) => {
  const params = req?.params?.id
  const result = await mealServices.getSingleMealFromDB(params)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Meal retrieved successfully!',
    data: result,
  })
})

const updateMealIntoDB = catchAsync(async (req: Request, res: Response) => {
  const params = req?.params?.id
  const payload = req?.body
  const result = await mealServices.updateMealIntoDB(params, payload)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Meal updated successfully!',
    data: result,
  })
})

const deleteMealFromDB = catchAsync(async (req: Request, res: Response) => {
  const params = req?.params?.id
  const result = await mealServices.deleteMealFromDB(params)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.NO_CONTENT,
    message: 'Meals deleted successfully!',
    data: result,
  })
})

export const mealControllers = {
  createMealIntoDB,
  getMealsFromDB,
  getSingleMealFromDB,
  updateMealIntoDB,
  deleteMealFromDB,
}
