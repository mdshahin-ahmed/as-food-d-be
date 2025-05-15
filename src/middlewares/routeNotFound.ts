/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Api not found',
    errorMessage: `The route ${req.originalUrl} does not exist on this server.`,
    errorDetails: '',
    stack: '',
  })
}

export default routeNotFound
