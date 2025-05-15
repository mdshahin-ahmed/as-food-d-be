import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'
import validateData from '../../../middlewares/validateData'
import { statementValidations } from './statement.validation'
import { statementControllers } from './statement.controller'
const router = express.Router()

router.post(
  '/recharge',
  auth(ROLE.admin, ROLE.user),
  validateData(statementValidations.RechargeBalanceSchema),
  statementControllers.createRechargeIntoDB,
)

router.get(
  '/',
  auth(ROLE.admin, ROLE.user),
  statementControllers.getStatementsFromDB,
)

router.patch(
  '/:id',
  auth(ROLE.admin),
  validateData(statementValidations.statementStatusValidationSchema),
  statementControllers.updateStatementStatus,
)

export const statementRoutes = router
