import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { analyticsServices } from './analytics.service'

const getDailyAnalytics = catchAsync(async (req: Request, res: Response) => {
  const result = await analyticsServices.getDailyAnalytics()

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Daily analytics retrieved successfully',
    data: result,
  })
})

export const analyticsControllers = {
  getDailyAnalytics,
}
