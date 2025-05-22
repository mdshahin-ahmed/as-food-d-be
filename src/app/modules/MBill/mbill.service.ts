/* eslint-disable @typescript-eslint/no-explicit-any */

import { JwtPayload } from 'jsonwebtoken'
import QueryBuilder from '../../builder/QueryBuilder'
import { mBillSearchableFields } from './mbill.constant'
import { MBill } from './mbill.model'
import AppError from '../../errors/app.error'
import httpStatus from 'http-status'
import { User } from '../user/user.model'

const createMBillIntoDB = async () => {
  // const bill = {
  //   _id: '6828c7ee6ada329f9f93a519',
  //   monthName: 'February',
  // }
  // const user = {
  //   _id: '682889585f4584f4517e690c',
  //   userId: '6057',
  //   mobile: '01622006057',
  //   area: 'karatiya',
  // }
  // const data = {
  //   bill: bill._id,
  //   monthName: bill.monthName,
  //   user: user?._id,
  //   mobile: user?.mobile,
  //   userId: user?.userId,
  //   area: user?.area,
  // }
  // const result = await MBill.create(data)
  // return result
}

const getPendingMBillFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  // const result = await Order.find({}).populate('user', 'name')
  // return result
  const ordersQuery = new QueryBuilder(
    MBill.find()
      .populate('user', 'name isActive area address bill imageUrl')
      .populate('bill', 'price')
      .populate('paidBy', 'name  imageUrl')
      .populate('approvedBy', 'name  imageUrl')
      .populate('area', 'name'),
    query,
    user,
  )
    .search(mBillSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await ordersQuery.countTotal()
  const result = await ordersQuery.modelQuery

  return {
    meta,
    result,
  }
}
const getMBillFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  // const result = await Order.find({}).populate('user', 'name')
  // return result
  const ordersQuery = new QueryBuilder(
    MBill.find()
      .populate('user', 'name isActive area address bill imageUrl')
      .populate('bill', 'price')
      .populate('paidBy', 'name  imageUrl')
      .populate('approvedBy', 'name  imageUrl')
      .populate('area', 'name'),
    query,
    user,
  )
    .search(mBillSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await ordersQuery.countTotal()
  const result = await ordersQuery.modelQuery

  return {
    meta,
    result,
  }
}

const updateBillStatusPaid = async (
  id: string,
  payload: { status: string },
  user: JwtPayload,
) => {
  const isBillExist = await MBill.findById(id)
  if (!isBillExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Bill not found',
      'Bill not found!',
    )
  }
  const isPaidByExist = await User.findById(user?._id)
  if (!isPaidByExist || !isPaidByExist?.isActive) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You have no access to paid',
      'You have no access to paid',
    )
  }

  const data = {
    status: payload?.status,
    paidBy: isPaidByExist?._id,
  }

  const result = await MBill.findByIdAndUpdate(isBillExist?._id, data, {
    new: true,
  })
  return {
    status: result?.status,
  }
}

const updateBillStatusApprove = async (
  payload: { ids: string[]; status: string },
  user: JwtPayload,
) => {
  // Validate the user making the request
  const isApprovedByExist = await User.findById(user?._id)
  if (!isApprovedByExist || !isApprovedByExist?.isActive) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You have no access to approve',
      'You have no access to approve',
    )
  }

  // Check if all bills exist
  const bills = await MBill.find({ _id: { $in: payload?.ids } })
  if (bills.length !== payload?.ids?.length) {
    const foundIds = bills.map((bill) => bill._id.toString())
    const missingIds = payload?.ids?.filter((id) => !foundIds.includes(id))
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Some bills not found: ${missingIds.join(', ')}`,
      'Bill approval failed',
    )
  }

  // Update all bills in a single operation
  const result = await MBill.updateMany(
    { _id: { $in: payload?.ids } },
    {
      status: payload.status,
      approvedBy: isApprovedByExist._id,
    },
    { new: true },
  )

  return {
    modifiedCount: result.modifiedCount,
    status: payload.status,
  }
}

export const mBillServices = {
  createMBillIntoDB,
  getMBillFromDB,
  updateBillStatusPaid,
  updateBillStatusApprove,
  getPendingMBillFromDB,
}
