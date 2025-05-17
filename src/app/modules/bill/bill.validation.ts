import Joi from 'joi'

const createBillValidationSchema = Joi.object({
  body: Joi.object({
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
      .label('Month'),

    price: Joi.number().positive().required().label('Amount'),
  }),
})

export const billValidations = {
  createBillValidationSchema,
}
