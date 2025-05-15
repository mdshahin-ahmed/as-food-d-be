import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { cancelReqServices } from './cancelreq.service'
import sendResponse from '../../utils/sendResponse'

const createCancelReq = catchAsync(async (req: Request, res: Response) => {
  const user = req.user
  const result = await cancelReqServices.createCancelReqIntoDB(user, req.body)
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Cancel request added successfully',
    data: result,
  })
})
const getCancelRequestFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query
    const user = req.user
    const result = await cancelReqServices.getCancelRequestFromDB(query, user)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Cancel request retrieved successfully',
      data: result,
    })
  },
)

const updateCancelReqStatus = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.params?.id
    const status = req.body

    const result = await cancelReqServices.updateCancelReqStatus(id, status)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Cancel request updated successfully',
      data: result,
    })
  },
)

export const cancelReqControllers = {
  createCancelReq,
  getCancelRequestFromDB,
  updateCancelReqStatus,
}
