/* eslint-disable @typescript-eslint/no-explicit-any */

import { JwtPayload } from 'jsonwebtoken'
import QueryBuilder from '../../builder/QueryBuilder'
import { mBillSearchableFields } from './mbill.constant'
import { MBill } from './mbill.model'

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

const getMBillFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  // const result = await Order.find({}).populate('user', 'name')
  // return result
  const ordersQuery = new QueryBuilder(
    MBill.find()
      .populate('user', 'name isActive area address')
      .populate('bill', 'price'),
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

// const updateOrderStatus = async (id: string, status: { status: string }) => {
//   const isMealExist = await Order.findById(id)
//   if (!isMealExist) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       'Order not found',
//       'Order not found!',
//     )
//   }

//   const result = await Order.findByIdAndUpdate(id, status, {
//     new: true,
//   })
//   return result
// }

// const cancelOrder = async (id: string, status: { status: string }) => {
//   const session = await startSession()

//   try {
//     const result = await session.withTransaction(async () => {
//       // check meal is exist
//       const isOrderExist = await Order.findById(id)
//       if (!isOrderExist) {
//         throw new AppError(
//           httpStatus.NOT_FOUND,
//           'Order not found',
//           'Order not found!',
//         )
//       }
//       // check user exist
//       const isUserExists = await User.findById(isOrderExist?.user).session(
//         session,
//       )

//       if (!isUserExists) {
//         throw new AppError(
//           httpStatus.NOT_FOUND,
//           'User not found',
//           'User not found!',
//         )
//       }

//       // add balance
//       const addBalance = await User.findByIdAndUpdate(
//         isUserExists?._id,
//         {
//           balance: Number(isUserExists?.balance) + Number(isOrderExist?.price),
//         },
//         { session, new: true },
//       )

//       if (!addBalance?.balance) {
//         throw new AppError(
//           httpStatus.INTERNAL_SERVER_ERROR,
//           'Internal Server Error',
//           'Something Went Wrong',
//         )
//       }

//       const result = await Order.findByIdAndUpdate(id, status, {
//         new: true,
//       })
//       return result
//     })
//     return result
//   } catch (error: any) {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       error?.message || 'Order Canceled Failed',
//       error?.errorMessage || 'Order Canceled Failed',
//     )
//   } finally {
//     session.endSession()
//   }
// }

export const mBillServices = {
  createMBillIntoDB,
  getMBillFromDB,
  // updateOrderStatus,
  // cancelOrder,
}
