import Joi from 'joi'

const otpValidationSchema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  }),
})
const verifyOtpValidationSchema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    otp: Joi.string().length(6).required(),
  }),
})

export const otpValidations = { otpValidationSchema, verifyOtpValidationSchema }
