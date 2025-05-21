import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'
import { areaControllers } from './area.controller'
import validateData from '../../../middlewares/validateData'
import { areaValidations } from './area.validation'
const router = express.Router()

router.get('/', auth(ROLE.admin), areaControllers.getAreasFromDB)
router.post(
  '/',
  auth(ROLE.admin),
  validateData(areaValidations.createAreaValidationSchema),
  areaControllers.createAreaIntoDB,
)

export const areaRoutes = router
