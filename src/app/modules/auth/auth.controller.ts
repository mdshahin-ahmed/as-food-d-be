import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { authServices } from './auth.service'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUser(req.body)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User login successfully!',
    data: result,
  })
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user
  const data = req?.body
  const result = await authServices.changePassword(user, data)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User login successfully!',
    data: result,
  })
})
const updatePassword = catchAsync(async (req: Request, res: Response) => {
  const data = req?.body
  const result = await authServices.updatePassword(data)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Password updated successfully!',
    data: result,
  })
})

export const authControllers = {
  loginUser,
  changePassword,
  updatePassword,
}
