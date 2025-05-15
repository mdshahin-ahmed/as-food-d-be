import { Error } from 'mongoose'

const handleCastError = (err: Error.CastError) => {
  return {
    message: 'Invalid ID',
    errorMessage: `${err.value} is not a valid ID!`,
    errorDetails: err,
  }
}

export default handleCastError
