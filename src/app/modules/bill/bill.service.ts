/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import { IBill } from './bill.interface'
import { Bill } from './bill.model'
import AppError from '../../errors/app.error'
import { startSession } from 'mongoose'
import { MBill } from '../MBill/mbill.model'
import { User } from '../user/user.model'

const createBillIntoDB = async (payload: IBill) => {
  const session = await startSession()

  // try {
  //   const result = await session.withTransaction(async () => {
  //     // const result = await Bill.create(payload)
  //     // return result
  //     const bill = await Bill.create([payload], { session })

  //     // 2. Find all active users with role "user"
  //     const users = await User.find({
  //       role: 'user',
  //       isActive: true,
  //     }).session(session)

  //     // 3. Prepare MBill entries
  //     const mbills = users.map((user) => ({
  //       user: user._id,
  //       bill: bill[0]._id,
  //       mobile: user.mobile,
  //       monthName: payload.monthName,
  //       area: user.area,
  //       userId: user.userId,
  //       // status: 'pending', // default value
  //     }))

  //     // 4. Insert MBill entries
  //     await MBill.insertMany(mbills, { session })

  //     // 5. Commit transaction
  //     await session.commitTransaction()
  //     return bill[0]
  //   })
  //   return result
  // } catch (error: any) {
  //   console.log(error)

  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     error?.message || 'Bill Create Failed',
  //     error?.errorMessage || 'Bill Create Failed',
  //   )
  // } finally {
  //   session.endSession()
  // }
  try {
    session.startTransaction()

    const currentYear = new Date().getFullYear()

    // Check if bill already exists for this month/year
    const existingBill = await Bill.findOne({
      monthName: payload.monthName,
      $expr: { $eq: [{ $year: '$createdAt' }, currentYear] },
    })

    if (existingBill) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Bill for ${payload.monthName} ${currentYear} already exists`,
        `Bill for ${payload.monthName} ${currentYear} already exists`,
      )
    }
    // Create bill
    const bill = await Bill.create([payload], { session })

    // Find all active users with role "user"
    const users = await User.find({
      role: 'user',
      isActive: true,
    }).session(session)

    // Prepare MBill entries
    const mbills = users.map((user) => ({
      user: user._id,
      bill: bill[0]._id,
      mobile: user.mobile,
      monthName: payload.monthName,
      area: user.area,
      userId: user.userId,
    }))

    // Insert MBill entries
    await MBill.insertMany(mbills, { session })

    // Commit transaction
    await session.commitTransaction()

    return bill[0]
  } catch (error: any) {
    // Abort transaction on error
    await session.abortTransaction()

    console.error('Bill Creation Failed Error', error)

    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Bill Creation Failed',
      error?.errorMessage || 'Bill Creation Failed',
    )
  } finally {
    // End session in all cases
    await session.endSession()
  }
}
const getBillsFromDB = async (query: Record<string, unknown>) => {
  // const result = await Order.find({}).populate('user', 'name')
  // return result
  const billQuery = new QueryBuilder(Bill.find(), query)
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await billQuery.countTotal()
  const result = await billQuery.modelQuery

  return {
    meta,
    result,
  }
}
// const getSingleBillFromDB = async (id: string) => {
//   const result = await Bill.findById(id)
//   if (!result) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Bill Not Found', 'Bill Not Found')
//   }
//   return result
// }
const updateBillIntoDB = async (id: string, payload: IBill) => {
  const result = await Bill.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bill Not Found', 'Bill Not Found')
  }
  return result
}
// const deleteBillFromDB = async (id: string) => {
//   const result = await Bill.findByIdAndDelete(id)
//   if (!result) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Bill Not Found', 'Bill Not Found')
//   }
//   return null
// }

export const BillServices = {
  createBillIntoDB,
  getBillsFromDB,
  // getSingleBillFromDB,
  updateBillIntoDB,
  // deleteBillFromDB,
}
