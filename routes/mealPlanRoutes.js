const express = require('express');
const router = express.Router();
const mealPlanController = require('../controllers/mealPlanController')

router.post('/', mealPlanController.createMealPlan);
router.get('/:id', mealPlanController.getMealPlanById);
router.get('/',mealPlanController.getAllMealPlans);
router.put('/:id', mealPlanController.updateMealPlan);
router.delete('/:id', mealPlanController.deleteMealPlan);
router.get('/missing-planning-days', mealPlanController.countMissingPlanningDays);
router.get('/unreasonable-interval-counts', mealPlanController.getUnreasonableMealPlansIntervalCounts);
router.get('/unreasonable-meal-plan-counts', mealPlanController.getUnreasonableMealPlanCounts);

module.exports = router;
