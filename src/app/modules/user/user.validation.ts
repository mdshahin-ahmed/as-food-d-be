import Joi from 'joi'

// const createUserValidationSchema = Joi.object({
//   body: Joi.object({
//     name: Joi.string().min(3).max(30).required(),
//     email: Joi.string()
//       .email({ tlds: { allow: false } })
//       .required(),
//     mobile: Joi.string()
//       .length(11)
//       .pattern(/^01\d+$/)
//       .required()
//       .messages({
//         'string.length': 'Please provide a valid number',
//         'string.pattern.base': 'Please provide a valid number',
//         'any.required': 'Mobile number is required.',
//       }),
//     hostel: Joi.string().min(3).max(30).required(),
//     room: Joi.string().min(1).max(4).required(),
//     password: Joi.string().min(5).max(30).required(),
//   }),
// })
const createAdminValidationSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .allow('')
      .email({ tlds: { allow: false } })
      .optional(),
    mobile: Joi.string()
      .length(11)
      .pattern(/^01\d+$/)
      .required()
      .messages({
        'string.length': 'Please provide a valid number',
        'string.pattern.base': 'Please provide a valid number',
        'any.required': 'Mobile number is required.',
      }),
    address: Joi.string().min(3).max(50).required(),
    bill: Joi.number().positive().required(),
    area: Joi.string().min(1).max(30).required(),
    password: Joi.string().min(5).max(30).required(),
    // userId: Joi.string().required(),
    role: Joi.string().valid('admin', 'employee', 'user').required().messages({
      'string.base': 'Role must be a text.',
      'any.only': 'Role must be one of admin or employee or user',
      'any.required': 'Role is required.',
    }),
  }),
})

const updateUserValidationSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string()
      .allow('')
      .email({ tlds: { allow: false } })
      .optional(),
    mobile: Joi.string()
      .length(11)
      .pattern(/^01\d+$/)
      .optional()
      .messages({
        'string.length': 'Please provide a valid number',
        'string.pattern.base': 'Please provide a valid number',
        'any.required': 'Mobile number is required.',
      }),
    bill: Joi.when('role', {
      switch: [
        {
          is: 'user',
          then: Joi.number().positive().required().messages({
            'number.positive': 'Bill must be a positive number',
          }),
        },
        {
          is: Joi.valid('admin', 'employee'),
          then: Joi.number().min(0).required().messages({
            'number.base': 'Bill must be a number.',
            'number.min': 'Bill must be 0 or a positive number',
          }),
        },
      ],
      otherwise: Joi.forbidden(),
    }),
    address: Joi.string().min(3).max(50).optional(),
    area: Joi.string().min(1).max(30).optional(),
    // userId: Joi.string().optional(),
    role: Joi.string().valid('admin', 'employee', 'user').optional().messages({
      'string.base': 'Role must be a text.',
      'any.only': 'Role must be one of admin or employee or user',
      'any.required': 'Role is required.',
    }),
  }),
})

const imageUrlValidationSchema = Joi.object({
  body: Joi.object({
    imageUrl: Joi.string()
      .uri({ scheme: ['http', 'https'] }) // Ensures it's a valid URL with http or https
      .required()
      .messages({
        'string.uri': 'Please provide a valid image',
        'any.required': 'Image URL is required.',
      }),
  }),
})

export const userValidations = {
  createAdminValidationSchema,
  imageUrlValidationSchema,
  updateUserValidationSchema,
}
