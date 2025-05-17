import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import AppError from '../../errors/app.error'
import { IUser } from './user.interface'
import { User } from './user.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { userSearchableFields } from './user.constant'

const createUserIntoDB = async (payload: IUser) => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  )

  const result = await User.create({ ...payload, role: 'user' })

  return {
    username: result.name,
    email: result.email,
    role: result.role,
    _id: result._id,
  }
}
const createAdminIntoDB = async (payload: IUser) => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  )

  const userData = {
    ...payload,
    userId: payload?.mobile?.slice(-4),
  }

  const result = await User.create(userData)

  return {
    username: result.name,
  }
}

const getMe = async (payload: JwtPayload) => {
  // checking if the user is exist
  const isUserExists = await User.findById(payload?._id)
  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'User not found!',
    )
  }
  return isUserExists
}
const getUserById = async (id: string) => {
  // checking if the user is exist
  const isUserExists = await User.findById(id)
  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'User not found!',
    )
  }
  return isUserExists
}
const getUsers = async (query: Record<string, unknown>) => {
  // checking if the user is exist
  const usersQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await usersQuery.countTotal()
  const result = await usersQuery.modelQuery

  const totalBalance = await User.aggregate([
    {
      $group: {
        _id: null,
        totalBalance: { $sum: '$balance' },
      },
    },
  ])

  return {
    meta,
    result,
    totalBalance: totalBalance[0]?.totalBalance,
  }
}

const updateUserProfile = async (
  user: JwtPayload,
  imageUrl: { imageURL: string },
) => {
  const isUserExists = await User.findById(user?._id)
  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'User not found!',
    )
  }

  const result = await User.findByIdAndUpdate(user?._id, imageUrl, {
    new: true,
  })
  return result
}
const updateUser = async (id: string, payload: IUser) => {
  const isUserExists = await User.findById(id)
  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'User not found!',
    )
  }

  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}
const updateUserStatus = async (id: string) => {
  const isUserExists = await User.findById(id)
  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'User not found!',
    )
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isActive: !isUserExists?.isActive },
    {
      new: true,
    },
  )
  return {
    isActive: result?.isActive,
  }
}

const deleteUser = async (id: string) => {
  const isUserExists = await User.findById(id)
  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'User not found!',
    )
  }

  const result = await User.findByIdAndDelete(id)
  return result
}

export const userServices = {
  createUserIntoDB,
  createAdminIntoDB,
  getMe,
  getUsers,
  updateUserProfile,
  updateUser,
  getUserById,
  deleteUser,
  updateUserStatus,
}
