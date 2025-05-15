import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { otpServices } from './otp.service'

const createOTPIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await otpServices.createOTPIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Otp sent successfully',
    data: result,
  })
})
const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const result = await otpServices.verifyOtp(req.body)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Otp Verified',
    data: result,
  })
})

export const otpControllers = { createOTPIntoDB, verifyOtp }
