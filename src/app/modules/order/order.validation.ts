import Joi from 'joi'

const orderStatusValidationSchema = Joi.object({
  body: Joi.object({
    status: Joi.string().valid('delivered', 'pending').required().messages({
      'any.only': 'Status must be one of pending, delivered',
      'any.required': 'Status is required',
    }),
  }),
})
const orderCancelValidationSchema = Joi.object({
  body: Joi.object({
    status: Joi.string().valid('canceled').required().messages({
      'any.only': 'Status must be canceled',
      'any.required': 'Status is required',
    }),
  }),
})

export const orderValidations = {
  orderStatusValidationSchema,
  orderCancelValidationSchema,
}
