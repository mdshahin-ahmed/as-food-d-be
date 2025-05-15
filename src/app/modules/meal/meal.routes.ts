import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'
import { mealControllers } from './meal.controller'
import validateData from '../../../middlewares/validateData'
import { mealValidations } from './meal.validation'
const router = express.Router()

router.post(
  '/',
  auth(ROLE.admin),
  validateData(mealValidations.createMealValidationSchema),
  mealControllers.createMealIntoDB,
)
router.get('/', auth(ROLE.admin), mealControllers.getMealsFromDB)
router.get(
  '/user-meal',
  auth(ROLE.admin, ROLE.manager, ROLE.user),
  mealControllers.getMealsFromDB,
)
router.get('/:id', auth(ROLE.admin), mealControllers.getSingleMealFromDB)
router.put(
  '/:id',
  auth(ROLE.admin),
  validateData(mealValidations.createMealValidationSchema),
  mealControllers.updateMealIntoDB,
)
router.delete('/:id', auth(ROLE.admin), mealControllers.deleteMealFromDB)

export const mealRoutes = router
