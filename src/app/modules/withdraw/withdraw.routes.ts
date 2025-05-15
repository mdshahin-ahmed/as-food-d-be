import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'

import validateData from '../../../middlewares/validateData'
import { withdrawControllers } from './withdraw.controller'
import { withdrawValidations } from './withdraw.validation'
const router = express.Router()

router.post(
  '/',
  auth(ROLE.admin, ROLE.user, ROLE.manager),
  validateData(withdrawValidations.createWithdrawReqValidationSchema),
  withdrawControllers.createWithdrawReq,
)

router.get(
  '/',
  auth(ROLE.admin, ROLE.user),
  withdrawControllers.getWithdrawRequest,
)

router.patch(
  '/approved/:id',
  auth(ROLE.admin),
  withdrawControllers.approveWithdrawReq,
)
router.patch(
  '/cancel/:id',
  auth(ROLE.admin),
  withdrawControllers.cancelWithdrawReq,
)

export const withdrawRoutes = router
