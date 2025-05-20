import express from 'express'
import auth from '../../../middlewares/auth'
import validateData from '../../../middlewares/validateData'
import { ROLE } from '../user/user.constant'
import { BillControllers } from './bill.controller'
import { billValidations } from './bill.validation'
const router = express.Router()

router.post(
  '/',
  auth(ROLE.admin),
  validateData(billValidations.createBillValidationSchema),
  BillControllers.createBillIntoDB,
)
router.get('/', auth(ROLE.admin), BillControllers.getBillsFromDB)
// router.get(
//   '/user-Bill',
//   auth(ROLE.admin, ROLE.manager, ROLE.user),
//   BillControllers.getBillsFromDB,
// )
// router.get('/:id', auth(ROLE.admin), BillControllers.getSingleBillFromDB)
router.patch(
  '/:id',
  auth(ROLE.admin),
  validateData(billValidations.createBillValidationSchema),
  BillControllers.updateBillIntoDB,
)
// router.delete('/:id', auth(ROLE.admin), BillControllers.deleteBillFromDB)

export const billRoutes = router
