/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import AppError from '../../errors/app.error'
import { User } from '../user/user.model'

import { Area } from './area.model'
import { capitalize } from '../../utils/helper'

const createAreaIntoDB = async (
  payload: { name: string },
  user: JwtPayload,
) => {
  const isUserExist = await User.findById(user?._id)
  if (!isUserExist || !isUserExist?.isActive) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You have no access to create area',
      'You have no access to create area',
    )
  }

  const result = await Area.create(payload)
  return { name: result?.name }
}

const getAreasFromDB = async () => {
  const result = await Area.find({})
  return result
}
const getAreasListFromDB = async () => {
  const result = await Area.find({})
  return result.map((area) => ({
    key: area._id,
    value: area._id,
    text: capitalize(area.name),
  }))
}

const updateAreaIntoDB = async (
  id: string,
  payload: { name: string },
  user: JwtPayload,
) => {
  const isUserExist = await User.findById(user?._id)
  if (!isUserExist || !isUserExist?.isActive) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You have no access to update area',
      'You have no access to update area',
    )
  }

  const isAreaExist = await Area.findById(id)

  if (!isAreaExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Area not found', 'Area not found')
  }

  const result = await Area.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return { name: result?.name }
}

export const areaServices = {
  createAreaIntoDB,
  getAreasFromDB,
  updateAreaIntoDB,
  getAreasListFromDB,
}
