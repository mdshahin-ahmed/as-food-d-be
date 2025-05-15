/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/app.error'
import { IMeal } from './meal.interface'
import { Meal } from './meal.model'

const createMealIntoDB = async (payload: IMeal) => {
  const result = await Meal.create(payload)
  return result
}
const getMealsFromDB = async (type?: any) => {
  const query = type ? type : {}
  const result = await Meal.find(query)
  return result
}
const getSingleMealFromDB = async (id: string) => {
  const result = await Meal.findById(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Meal Not Found', 'Meal Not Found')
  }
  return result
}
const updateMealIntoDB = async (id: string, payload: IMeal) => {
  const result = await Meal.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Meal Not Found', 'Meal Not Found')
  }
  return result
}
const deleteMealFromDB = async (id: string) => {
  const result = await Meal.findByIdAndDelete(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Meal Not Found', 'Meal Not Found')
  }
  return null
}

export const mealServices = {
  createMealIntoDB,
  getMealsFromDB,
  getSingleMealFromDB,
  updateMealIntoDB,
  deleteMealFromDB,
}
