import { Router } from 'express'
import { authRouter } from '../modules/auth/auth.route'
import { mBillRoutes } from '../modules/MBill/mbill.routes'
import { otpRoute } from '../modules/otp/otp.routes'
import { userRouter } from '../modules/user/user.route'
import { billRoutes } from '../modules/bill/bill.routes'
import { areaRoutes } from '../modules/Area/area.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/mbill',
    route: mBillRoutes,
  },
  {
    path: '/bill',
    route: billRoutes,
  },
  {
    path: '/area',
    route: areaRoutes,
  },
  {
    path: '/otp',
    route: otpRoute,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
