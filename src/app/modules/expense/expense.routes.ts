import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'
import validateData from '../../../middlewares/validateData'
import { expenseValidations } from './expense.validation'
import { expenseControllers } from './expense.controller'
const router = express.Router()

router.post(
  '/',
  auth(ROLE.admin),
  validateData(expenseValidations.addExpenseValidationSchema),
  expenseControllers.addExpenseIntoDB,
)

router.get('/', auth(ROLE.admin), expenseControllers.getExpenseListFromDB)

router.patch(
  '/:id',
  auth(ROLE.admin),
  validateData(expenseValidations.addExpenseValidationSchema),
  expenseControllers.updateExpense,
)

export const expenseRoutes = router
