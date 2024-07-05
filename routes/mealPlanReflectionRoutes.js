const express = require('express');
const router = express.Router();
const mealPlanReflectionController = require('../controllers/mealPlanReflectionController');

router.post('/', mealPlanReflectionController.createMealPlanReflection);
router.get('/:id', mealPlanReflectionController.getMealPlanReflectionById);
router.put('/:id', mealPlanReflectionController.updateMealPlanReflection);
router.delete('/:id', mealPlanReflectionController.deleteMealPlanReflection);

module.exports = router;
