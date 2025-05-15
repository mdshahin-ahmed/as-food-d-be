/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (err: any) => {
  const match = err.message.match(/"([^"]*)"/)
  const extractedMessage = match && match[1]

  return {
    message: 'Duplicate Entry',
    errorMessage: `${extractedMessage} is already exist`,
    errorDetails: err,
  }
}

export default handleDuplicateError
