import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'

import { cancelReqControllers } from './cancelreq.controller'
import validateData from '../../../middlewares/validateData'
import { cancelReqValidations } from './cancelreq.validation'
const router = express.Router()

router.post(
  '/',
  auth(ROLE.admin, ROLE.user, ROLE.manager),
  validateData(cancelReqValidations.createCancelReqValidationSchema),
  cancelReqControllers.createCancelReq,
)

router.get(
  '/',
  auth(ROLE.admin, ROLE.user),
  cancelReqControllers.getCancelRequestFromDB,
)

router.patch(
  '/:id',
  auth(ROLE.admin),
  validateData(cancelReqValidations.cancelReqStatusValidationSchema),
  cancelReqControllers.updateCancelReqStatus,
)

export const cancelReqRoute = router
