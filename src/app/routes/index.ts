import { Router } from 'express'
import { authRouter } from '../modules/auth/auth.route'
import { mBillRoutes } from '../modules/MBill/mbill.routes'
import { otpRoute } from '../modules/otp/otp.routes'
import { userRouter } from '../modules/user/user.route'

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
    path: '/otp',
    route: otpRoute,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
