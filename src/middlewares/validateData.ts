import { NextFunction, Request, Response } from 'express'
import Joi from 'joi' // Import Joi for validation
import catchAsync from '../app/utils/catchAsync'

const validateData = (schema: Joi.ObjectSchema) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Perform Joi validation on req.body
    await schema.validateAsync({ body: req.body }, { abortEarly: false }) // Collect all validation errors
    next() // Proceed to the next middleware if validation passes
  })
}

export default validateData

// import { NextFunction, Request, Response } from 'express'
// import { AnyZodObject } from 'zod'
// import catchAsync from '../app/utils/catchAsync'

// const validateData = (schema: AnyZodObject) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     await schema.parseAsync({
//       body: req.body,
//     })
//     next()
//   })
// }

// export default validateData
