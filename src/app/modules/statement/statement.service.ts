/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken'
import { IStatement } from './statement.interface'
import { startSession } from 'mongoose'
import AppError from '../../errors/app.error'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { Statement } from './statement.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { statementSearchableFields } from './statement.constant'

const createRechargeIntoDB = async (user: JwtPayload, payload: IStatement) => {
  const session = await startSession()

  try {
    const result = await session.withTransaction(async () => {
      // check user exist
      const isUserExists = await User.findById(user?._id).session(session)

      if (!isUserExists) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'User not found',
          'User not found!',
        )
      }

      if (payload?.amount <= 0) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'Amount should be positive number2',
          'Amount should be positive number',
        )
      }

      // Add balance
      const addBalance = await User.findByIdAndUpdate(
        isUserExists?._id,
        {
          balance: isUserExists?.balance + payload?.amount,
        },
        { session, new: true },
      )

      if (!addBalance?.balance) {
        throw new AppError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Can't add Balance",
          "Can't add balance",
        )
      }

      const data = {
        user: isUserExists?._id,
        type: payload?.type,
        mobile: payload?.mobile,
        amount: payload?.amount,
        exactAmount: payload?.exactAmount,
        transactionNumber: payload?.transactionNumber,
        prevBalance: isUserExists?.balance,
        newBalance: addBalance?.balance,
        userId: isUserExists?.userId,
      }
      const statement = await Statement.create([data], { session })
      return statement[0]
    })
    return result
  } catch (error: any) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Recharge Failed',
      error?.errorMessage || 'Recharge Failed',
    )
  } finally {
    session.endSession()
  }
}

const getStatementsFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  // const result = await Order.find({}).populate('user', 'name')
  // return result
  const statementQuery = new QueryBuilder(
    Statement.find().populate('user', ['name', 'userId']),
    query,
    user,
  )
    .search(statementSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await statementQuery.countTotal()
  const result = await statementQuery.modelQuery

  return {
    meta,
    result,
  }
}

const updateStatementStatus = async (
  id: string,
  status: { status: string },
) => {
  const isStatementExist = await Statement.findById(id)
  if (!isStatementExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Statement not found',
      'Statement not found!',
    )
  }

  const result = await Statement.findByIdAndUpdate(id, status, {
    new: true,
  })
  return result
}

export const statementServices = {
  createRechargeIntoDB,
  getStatementsFromDB,
  updateStatementStatus,
}
