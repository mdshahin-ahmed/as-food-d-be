/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/app.error'
import { User } from '../user/user.model'
import { IWithdraw } from './withdraw.interface'
import { Withdraw } from './withdraw.model'
import { startSession } from 'mongoose'

const createWithdrawReqIntoDB = async (
  user: JwtPayload,
  payload: IWithdraw,
) => {
  const isUserExists = await User.findById(user?._id)

  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'User not found!',
    )
  }

  if (isUserExists?.balance < payload?.amount) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You have no enough balance',
      'You have no enough balance for withdraw',
    )
  }

  if (payload?.amount < 1) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Amount should be positive',
      'You have no enough balance for withdraw',
    )
  }

  if (!Number.isInteger(payload?.amount)) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Please provide a valid amount',
      'You have no enough balance for withdraw',
    )
  }

  const result = await Withdraw.create({ ...payload, user: user?._id })

  return result
}

const getWithdrawRequestFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  const statementQuery = new QueryBuilder(
    Withdraw.find().populate('user', ['name', 'userId', 'balance']),
    query,
    user,
  )
    .search([])
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

const approveWithdrawReq = async (id: string) => {
  const session = await startSession()

  try {
    const result = await session.withTransaction(async () => {
      // check meal is exist
      const isWithdrawReqExist = await Withdraw.findById(id)
      if (!isWithdrawReqExist) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'Withdraw req not found',
          'Withdraw req not found!',
        )
      }
      // if (isWithdrawReqExist?.status !== 'pending') {
      //   throw new AppError(
      //     httpStatus.NOT_FOUND,
      //     `Withdraw already ${isWithdrawReqExist?.status}`,
      //     `Withdraw already ${isWithdrawReqExist?.status}`,
      //   )
      // }

      // check user exist
      const isUserExists = await User.findById(
        isWithdrawReqExist?.user,
      ).session(session)

      if (!isUserExists) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'User not found',
          'User not found!',
        )
      }

      // check user have enough balance

      if (isUserExists?.balance < isWithdrawReqExist?.amount) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'You have no enough balance',
          'You have no enough balance for withdraw',
        )
      }

      // minus balance
      const minusBalance = await User.findByIdAndUpdate(
        isUserExists?._id,
        {
          balance:
            Number(isUserExists?.balance) - Number(isWithdrawReqExist?.amount),
        },
        { session, new: true },
      )

      if (!minusBalance?.balance && minusBalance?.balance !== 0) {
        throw new AppError(
          httpStatus.INTERNAL_SERVER_ERROR,
          'Internal Server Error',
          'Something Went Wrong',
        )
      }

      const result = await Withdraw.findByIdAndUpdate(
        id,
        { status: 'approved' },
        {
          new: true,
        },
      )
      return result
    })
    return result
  } catch (error: any) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Withdraw Req Failed',
      error?.errorMessage || 'Withdraw Req Failed',
    )
  } finally {
    session.endSession()
  }
}

const cancelWithdrawReq = async (id: string) => {
  // check meal is exist
  const isWithdrawReqExist = await Withdraw.findById(id)
  if (!isWithdrawReqExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Withdraw req not found',
      'Withdraw req not found!',
    )
  }

  if (isWithdrawReqExist?.status !== 'pending') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Withdraw already ${isWithdrawReqExist?.status}`,
      `Withdraw already ${isWithdrawReqExist?.status}`,
    )
  }
  // check user exist
  const isUserExists = await User.findById(isWithdrawReqExist?.user)

  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'User not found!',
    )
  }

  await Withdraw.findByIdAndUpdate(
    id,
    { status: 'canceled' },
    {
      new: true,
    },
  )

  return {}
}

export const withdrawServices = {
  createWithdrawReqIntoDB,
  getWithdrawRequestFromDB,
  approveWithdrawReq,
  cancelWithdrawReq,
}
