import { Router } from 'express'
import { analyticsRoutes } from '../modules/analytics/analytics.routes'
import { authRouter } from '../modules/auth/auth.route'
import { balanceRoutes } from '../modules/balance/balance.routes'
import { cancelReqRoute } from '../modules/cancelreq/cancelreq.routes'
import { expenseRoutes } from '../modules/expense/expense.routes'
import { billRoutes } from '../modules/bill/bill.routes'
import { mBillRoutes } from '../modules/MBill/mbill.routes'
import { otpRoute } from '../modules/otp/otp.routes'
import { statementRoutes } from '../modules/statement/statement.routes'
import { userRouter } from '../modules/user/user.route'
import { withdrawRoutes } from '../modules/withdraw/withdraw.routes'

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
    path: '/bill',
    route: billRoutes,
  },
  {
    path: '/mbill',
    route: mBillRoutes,
  },
  {
    path: '/statement',
    route: statementRoutes,
  },
  {
    path: '/balance',
    route: balanceRoutes,
  },
  {
    path: '/cancel',
    route: cancelReqRoute,
  },
  {
    path: '/otp',
    route: otpRoute,
  },
  {
    path: '/expense',
    route: expenseRoutes,
  },
  {
    path: '/analytics',
    route: analyticsRoutes,
  },
  {
    path: '/withdraw',
    route: withdrawRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
