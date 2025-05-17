import { NextFunction, Request, Response } from 'express'
import catchAsync from '../app/utils/catchAsync'
import httpStatus from 'http-status'
import AppError from '../app/errors/app.error'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../app/config'
import { TRole } from '../app/modules/user/user.interface'
import { User } from '../app/modules/user/user.model'

const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    // if the token is send from the client
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized Access.',
        'You do not have the necessary permissions to access this resource.',
      )
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload

    const users = await User.findById(decoded?._id)
    if (!users) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized Access.',
        'You do not have the necessary permissions to access this resource.',
      )
    }

    const role = decoded.role
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized Access.',
        'You do not have the necessary permissions to access this resource.',
      )
    }
    // decoded
    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
