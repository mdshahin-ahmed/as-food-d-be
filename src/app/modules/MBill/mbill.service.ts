/* eslint-disable @typescript-eslint/no-explicit-any */

import { JwtPayload } from 'jsonwebtoken'
import QueryBuilder from '../../builder/QueryBuilder'
import { mBillSearchableFields } from './mbill.constant'
import { MBill } from './mbill.model'

const createMBillIntoDB = async () => {
  const bill = {
    _id: '6828c7ee6ada329f9f93a519',
    monthName: 'February',
  }
  const user = {
    _id: '682889585f4584f4517e690c',
    userId: '6057',
    mobile: '01622006057',
    area: 'karatiya',
  }

  const data = {
    bill: bill._id,
    monthName: bill.monthName,
    user: user?._id,
    mobile: user?.mobile,
    userId: user?.userId,
    area: user?.area,
  }

  const result = await MBill.create(data)

  return result

  // const session = await startSession()

  // try {
  //   const result = await session.withTransaction(async () => {
  //     const isUserExists = await User.findOne({
  //       email: user?.email,
  //     }).session(session)

  //     if (!isUserExists) {
  //       throw new AppError(
  //         httpStatus.NOT_FOUND,
  //         'User not found',
  //         'User not found!',
  //       )
  //     }

  //     // check meal exist
  //     const isMealExist = await Meal.findById(id).session(session)
  //     if (!isMealExist) {
  //       throw new AppError(
  //         httpStatus.NOT_FOUND,
  //         'Meal not found',
  //         'Meal not found!',
  //       )
  //     }

  //     // balance check
  //     if (isMealExist?.price < 1) {
  //       throw new AppError(
  //         httpStatus.BAD_REQUEST,
  //         'Price should be grater then 0',
  //         'Price should be grater then 0',
  //       )
  //     }

  //     if (isMealExist?.stock < 1) {
  //       throw new AppError(
  //         httpStatus.BAD_REQUEST,
  //         'Stock Out',
  //         'No meal available',
  //       )
  //     }

  //     // Decrease quantity

  //     const mealQuantity = await Meal.findByIdAndUpdate(
  //       isMealExist?._id,
  //       {
  //         stock: isMealExist?.stock - 1,
  //       },
  //       { session, new: true },
  //     )

  //     if (!mealQuantity) {
  //       throw new AppError(
  //         httpStatus.INTERNAL_SERVER_ERROR,
  //         "Can't add order",
  //         "Can't add order",
  //       )
  //     }

  //     // Cut balance

  //     // Find the last order to generate uId
  //     const lastOrder = await Order.findOne()
  //       .sort({ createdAt: -1 })
  //       .select('uId')
  //       .session(session)

  //     const newUId = lastOrder ? Number(lastOrder.uId) + 1 : 1

  //     // data
  //     const data = {
  //       user: isUserExists?._id,
  //       name: isMealExist?.name,
  //       description: isMealExist?.description,
  //       price: isMealExist?.price,
  //       type: isMealExist?.type,
  //       uId: newUId,
  //       userId: isUserExists?.userId,
  //     }

  //     const orderResult = await Order.create([data], { session })
  //     return orderResult[0]
  //   })
  //   return result
  // } catch (error: any) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     error?.message || 'Order Failed',
  //     error?.errorMessage || 'Order Failed',
  //   )
  // } finally {
  //   session.endSession()
  // }
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
