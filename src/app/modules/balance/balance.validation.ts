import Joi from 'joi'

const addBalanceValidationSchema = Joi.object({
  body: Joi.object({
    id: Joi.string().required(),
    amount: Joi.number().positive().min(1).required().messages({
      'number.base': 'Amount must be a number',
      'number.positive': 'Amount must be a positive number',
      'number.min': 'Amount must be at least 1',
      'any.required': 'Amount is required',
    }),
  }),
})
export const balanceValidations = {
  addBalanceValidationSchema,
}
