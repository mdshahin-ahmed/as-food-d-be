import Joi from 'joi'

const addExpenseValidationSchema = Joi.object({
  body: Joi.object({
    amount: Joi.number().positive().required().messages({
      'number.base': 'Amount must be a number',
      'number.positive': 'Amount must be a positive number',
      'any.required': 'Amount is required',
    }),
    description: Joi.string().required(),
  }),
})
export const expenseValidations = {
  addExpenseValidationSchema,
}
