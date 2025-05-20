import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'
import { mBillControllers } from './mbill.controller'
const router = express.Router()

router.post(
  '/',
  auth(ROLE.admin),
  // validateData(mBillValidations.createMBillValidationSchema),
  mBillControllers.createMBillIntoDB,
)
router.get(
  '/',
  auth(ROLE.admin, ROLE.user, ROLE.employee),
  mBillControllers.getMBillFromDB,
)
router.patch(
  '/approved',
  auth(ROLE.admin),
  mBillControllers.updateBillStatusApprove,
)
router.patch(
  '/:id/paid',
  auth(ROLE.admin, ROLE.employee),
  mBillControllers.updateBillStatusPaid,
)
// router.patch(
//   '/cancel/:id',
//   auth(ROLE.admin, ROLE.manager),
//   validateData(orderValidations.orderCancelValidationSchema),
//   orderControllers.cancelOrder,
// )
// router.patch(
//   '/:id',
//   auth(ROLE.admin, ROLE.manager),
//   validateData(orderValidations.orderStatusValidationSchema),
//   orderControllers.updateOrderStatus,
// )

export const mBillRoutes = router
