import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      // unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    imageUrl: {
      type: String,
      // required: true,
      // default: '',
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'employee', 'user'],
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export const User = model<IUser>('User', userSchema)
