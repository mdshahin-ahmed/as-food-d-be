/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import { IBill } from './bill.interface'
import { Bill } from './bill.model'
import AppError from '../../errors/app.error'

const createBillIntoDB = async (payload: IBill) => {
  const result = await Bill.create(payload)
  return result
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
