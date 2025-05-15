import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'
import { analyticsControllers } from './analytics.controller'
const router = express.Router()

router.get('/monthly', auth(ROLE.admin), analyticsControllers.getDailyAnalytics)

export const analyticsRoutes = router
