/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import handleDuplicateError from '../app/errors/handleDuplicateError'
import handleValidationError from '../app/errors/handleValidationError'
import handleCastError from '../app/errors/handleCastError'
import AppError from '../app/errors/app.error'
import Joi from 'joi'
import handleJoiError from '../app/errors/handleJoiError'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const defaultValues = {
    statusCode: 500,
    message: 'Something went wrong!',
    errorMessage: 'Something went wrong!',
    errorDetails: {},
  }

  if (err instanceof Joi.ValidationError) {
    const error = handleJoiError(err)
    defaultValues.statusCode = error.statusCode
    defaultValues.message = error.message
    defaultValues.errorDetails = err
    defaultValues.errorMessage = error.errorMessage
  } else if (err?.code === 11000) {
    const error = handleDuplicateError(err)
    defaultValues.message = error.message
    defaultValues.errorDetails = err
    defaultValues.errorMessage = error.errorMessage
  } else if (err?.name === 'ValidationError') {
    const error = handleValidationError(err)
    defaultValues.message = error.message
    defaultValues.errorDetails = err
    defaultValues.errorMessage = error.errorMessage
  } else if (err?.name === 'CastError') {
    const error = handleCastError(err)
    defaultValues.message = error.message
    defaultValues.errorDetails = err
    defaultValues.errorMessage = error.errorMessage
  } else if (err instanceof AppError) {
    defaultValues.message = err.message
    defaultValues.errorMessage = err.errorMessage
    defaultValues.statusCode = err.statusCode
    defaultValues.errorDetails = {}
  } else if (err instanceof Error) {
    defaultValues.message = err.name
    defaultValues.errorMessage = err.message
  }

  return res.status(defaultValues.statusCode).json({
    success: false,
    message: defaultValues.message,
    errorMessage: defaultValues.errorMessage,
    errorDetails: defaultValues.errorDetails,
    // stack: (defaultValues.errorDetails && err?.stack) || null,
  })
}

export default globalErrorHandler
