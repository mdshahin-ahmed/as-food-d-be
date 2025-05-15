import express from 'express'
import auth from '../../../middlewares/auth'
import validateData from '../../../middlewares/validateData'
import { ROLE } from '../user/user.constant'
import { userControllers } from '../user/user.controller'
import { userValidations } from '../user/user.validation'
import { authControllers } from './auth.controller'
import { authValidations } from './auth.validation'
const router = express.Router()

router.post(
  '/signup-admin',
  auth(ROLE.admin),
  validateData(userValidations.createAdminValidationSchema),
  userControllers.createAdmin,
)
// router.post(
//   '/signup',
//   validateData(userValidations.createUserValidationSchema),
//   userControllers.createUser,
// )

router.post(
  '/login',
  validateData(authValidations.loginValidationSchema),
  authControllers.loginUser,
)
router.post(
  '/change-password',
  auth(ROLE.admin, ROLE.user, ROLE.manager),
  validateData(authValidations.changePasswordValidationSchema),
  authControllers.changePassword,
)
router.patch(
  '/update-password',
  // auth(ROLE.admin, ROLE.manager, ROLE.user),
  validateData(authValidations.updatePasswordValidationSchema),
  authControllers.updatePassword,
)

export const authRouter = router
