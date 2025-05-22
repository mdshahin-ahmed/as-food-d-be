import Joi from 'joi'

const createAreaValidationSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      'any.required': `Area name is required`,
      'string.base': `Area name must be a string`,
    }),
  }),
})

export const areaValidations = {
  createAreaValidationSchema,
}
