/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import { startSession } from 'mongoose'
import AppError from '../../errors/app.error'
import { User } from '../user/user.model'
import { Balance } from './balance.model'
import { JwtPayload } from 'jsonwebtoken'
import QueryBuilder from '../../builder/QueryBuilder'
import { balanceSearchableFields } from './balance.constant'

const addBalanceIntoDB = async (payload: { amount: number; id: string }) => {
  const session = await startSession()

  try {
    const result = await session.withTransaction(async () => {
      // check user exist
      const isUserExists = await User.findById(payload?.id).session(session)

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

      if (payload?.amount < 1) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'Amount must be at least 1',
          'Amount must be at least 1',
        )
      }

      // Add balance
      const addBalance = await User.findByIdAndUpdate(
        isUserExists?._id,
        {
          balance: Number(isUserExists?.balance) + Number(payload?.amount),
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
        amount: payload?.amount,
        prevBalance: isUserExists?.balance,
        newBalance: addBalance?.balance,
        userId: isUserExists?.userId,
      }
      const balance = await Balance.create([data], { session })
      return balance[0]
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

const getBalanceFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  // const result = await Order.find({}).populate('user', 'name')
  // return result
  const statementQuery = new QueryBuilder(
    Balance.find().populate('user', ['name', 'userId']),
    query,
    user,
  )
    .search(balanceSearchableFields)
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

export const balanceServices = {
  addBalanceIntoDB,
  getBalanceFromDB,
}
