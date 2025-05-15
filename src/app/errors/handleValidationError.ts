import mongoose from 'mongoose'

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  return {
    message: 'Please Provide Valid Information',
    errorMessage: err.message,
    errorDetails: err,
  }
}

export default handleValidationError
