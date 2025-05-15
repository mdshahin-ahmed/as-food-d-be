import { model, Schema } from 'mongoose'
import { IMeal } from './meal.interface'

const mealSchema = new Schema<IMeal>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    // image: {
    //   type: String,
    //   required: true,
    // },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Meal = model<IMeal>('Meal', mealSchema)
