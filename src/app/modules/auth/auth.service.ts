import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import AppError from '../../errors/app.error'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import { Otp } from '../otp/otp.model'

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const isUserExists = await User.findOne({
    mobile: payload?.mobile,
  }).select('+password')
  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found!',
      'User not found!',
    )
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  )

  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Password do not matched!',
      'Password do not matched!',
    )
  }

  // create token and sent to the client

  const jwtPayload = {
    _id: isUserExists?._id,
    role: isUserExists?.role,
    email: isUserExists?.email,
    userId: isUserExists?.userId,
    mobile: isUserExists?.mobile,
  }

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '365d',
  })

  return {
    user: {
      name: isUserExists?.name,
      email: isUserExists?.email,
      role: isUserExists?.role,
    },
    token: accessToken,
  }
}

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPass: string; newPass: string },
) => {
  // checking is the user is exist
  const user = await User.findById(userData._id).select('+password')

  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User not found',
      'User not found',
    )
  }

  const currentPassword = await bcrypt.compare(payload?.oldPass, user?.password)

  if (!currentPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Password doesn't match",
      'Please provide correct password',
    )
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPass,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findByIdAndUpdate(
    user?._id,
    {
      password: newHashedPassword,
    },
    { new: true },
  )
  return null
}
const updatePassword = async (payload: {
  email: string
  password: string
  otp: string
}) => {
  // checking is the user is exist
  const user = await User.findOne({ email: payload?.email }).select('+password')

  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User not found',
      'User not found',
    )
  }

  const verifyOtp = await Otp.findOne({
    email: payload?.email,
    otp: payload.otp,
  })

  if (!verifyOtp) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Invalid OTP',
      'Please provide a valid OTP',
    )
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findByIdAndUpdate(
    user?._id,
    {
      password: newHashedPassword,
    },
    { new: true },
  )
  return null
}

export const authServices = {
  loginUser,
  changePassword,
  updatePassword,
}
