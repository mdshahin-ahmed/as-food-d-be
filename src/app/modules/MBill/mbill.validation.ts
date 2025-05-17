import Joi from 'joi'

const createMBillValidationSchema = Joi.object({
  body: Joi.object({
    user: Joi.string().required().label('User').messages({
      'any.required': `User is required`,
      'string.base': `User must be a string`,
    }),

    bill: Joi.string().required().label('Bill').messages({
      'any.required': `Bill is required`,
      'string.base': `Bill must be a string`,
    }),

    mobile: Joi.string()
      .length(11)
      .pattern(/^01\d+$/)
      .required()
      .messages({
        'string.length': 'Please provide a valid number',
        'string.pattern.base': 'Please provide a valid number',
        'any.required': 'Mobile number is required.',
      }),

    monthName: Joi.string()
      .valid(
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      )
      .required()
      .label('Month')
      .messages({
        'any.required': `Month is required`,
        'string.base': `Month must be a string`,
        'any.only': `"Month" must be a valid month (e.g., January, February, etc.)`,
      }),

    userId: Joi.string().required().label('User ID').messages({
      'any.required': `User ID is required`,
      'string.base': `User ID must be a string`,
    }),

    status: Joi.string()
      .valid('pending', 'paid', 'approve', 'cancel')
      .default('pending')
      .label('Status')
      .messages({
        'string.base': `Status must be a string`,
        'any.only': `Status must be one of: pending, paid, approve, cancel`,
      }),
  }),
})
// const orderStatusValidationSchema = Joi.object({
//   body: Joi.object({
//     status: Joi.string().valid('delivered', 'pending').required().messages({
//       'any.only': 'Status must be one of pending, delivered',
//       'any.required': 'Status is required',
//     }),
//   }),
// })
// const orderCancelValidationSchema = Joi.object({
//   body: Joi.object({
//     status: Joi.string().valid('canceled').required().messages({
//       'any.only': 'Status must be canceled',
//       'any.required': 'Status is required',
//     }),
//   }),
// })

export const mBillValidations = {
  createMBillValidationSchema,
  // orderStatusValidationSchema,
  // orderCancelValidationSchema,
}
