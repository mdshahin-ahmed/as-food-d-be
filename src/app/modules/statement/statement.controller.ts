import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { statementServices } from './statement.service'

const createRechargeIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user
  const data = req?.body
  const result = await statementServices.createRechargeIntoDB(user, data)

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Recharged successfully',
    data: result,
  })
})

const getStatementsFromDB = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const user = req.user
  const result = await statementServices.getStatementsFromDB(query, user)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Statements retrieved successfully',
    data: result,
  })
})

const updateStatementStatus = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.params?.id
    const status = req.body

    const result = await statementServices.updateStatementStatus(id, status)

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Statement updated successfully',
      data: result,
    })
  },
)

export const statementControllers = {
  createRechargeIntoDB,
  getStatementsFromDB,
  updateStatementStatus,
}
