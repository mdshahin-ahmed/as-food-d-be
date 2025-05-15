import express from 'express'
import validateData from '../../../middlewares/validateData'
import { otpControllers } from './otp.controller'
import { otpValidations } from './otp.validation'
const router = express.Router()

router.post(
  '/',
  // auth(ROLE.admin, ROLE.user, ROLE.manager),
  validateData(otpValidations.otpValidationSchema),
  otpControllers.createOTPIntoDB,
)
router.post(
  '/verify',
  // auth(ROLE.admin, ROLE.user, ROLE.manager),
  validateData(otpValidations.verifyOtpValidationSchema),
  otpControllers.verifyOtp,
)

export const otpRoute = router
