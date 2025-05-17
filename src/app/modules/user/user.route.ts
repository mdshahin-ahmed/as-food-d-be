import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'
import { userControllers } from './user.controller'
import validateData from '../../../middlewares/validateData'
import { userValidations } from './user.validation'
const router = express.Router()

router.get(
  '/me',
  auth(ROLE.admin, ROLE.user, ROLE.manager),
  userControllers.getMe,
)
router.get('/all', auth(ROLE.admin), userControllers.getUsers)
router.patch(
  '/profile',
  auth(ROLE.admin, ROLE.user, ROLE.manager),
  validateData(userValidations.imageUrlValidationSchema),
  userControllers.updateUserProfile,
)
router.patch('/:id/status', auth(ROLE.admin), userControllers.updateUserStatus)
router.get('/:id', auth(ROLE.admin), userControllers.getUserById)
router.patch(
  '/:id',
  auth(ROLE.admin),
  validateData(userValidations.updateUserValidationSchema),
  userControllers.updateUser,
)
router.delete('/:id', auth(ROLE.admin), userControllers.deleteUser)

export const userRouter = router
