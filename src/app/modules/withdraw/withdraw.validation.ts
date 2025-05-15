import Joi from 'joi'

const createWithdrawReqValidationSchema = Joi.object({
  body: Joi.object({
    amount: Joi.number().required(),
  }),
})

export const withdrawValidations = {
  createWithdrawReqValidationSchema,
}
