import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'
import { orderControllers } from './order.controller'
import validateData from '../../../middlewares/validateData'
import { orderValidations } from './order.validation'
const router = express.Router()

router.post(
  '/',
  auth(ROLE.admin, ROLE.user, ROLE.manager),
  orderControllers.createOrderIntoDB,
)
router.get(
  '/',
  auth(ROLE.admin, ROLE.user, ROLE.manager),
  orderControllers.getOrdersFromDB,
)
router.patch(
  '/cancel/:id',
  auth(ROLE.admin, ROLE.manager),
  validateData(orderValidations.orderCancelValidationSchema),
  orderControllers.cancelOrder,
)
router.patch(
  '/:id',
  auth(ROLE.admin, ROLE.manager),
  validateData(orderValidations.orderStatusValidationSchema),
  orderControllers.updateOrderStatus,
)

export const orderRoutes = router
