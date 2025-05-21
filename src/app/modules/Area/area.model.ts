import { model, Schema } from 'mongoose'
import { IArea } from './area.interface'

const areaSchema = new Schema<IArea>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Area = model<IArea>('Area', areaSchema)
