import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'
import validateData from '../../../middlewares/validateData'
import { balanceValidations } from './balance.validation'
import { balanceController } from './balance.controller'
const router = express.Router()

router.post(
  '/',
  auth(ROLE.admin),
  validateData(balanceValidations.addBalanceValidationSchema),
  balanceController.addBalanceIntoDB,
)
router.get('/', auth(ROLE.admin, ROLE.user), balanceController.getBalanceFromDB)

export const balanceRoutes = router
