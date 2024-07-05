const mealPlanReflectionService = require('../services/mealPlanReflectionService');

class mealPlanReflectionController {
  async getAllMealPlanReflections(req, res) {
    try {
      const reflections = await mealPlanReflectionService.getAllMealPlanReflections();
      res.json(reflections);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMealPlanReflectionById(req, res) {
    try {
      const reflection = await mealPlanReflectionService.getMealPlanReflectionById(req.params.id);
      if (reflection) {
        res.json(reflection);
      } else {
        res.status(404).json({ error: 'Reflection not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createMealPlanReflection(req, res) {
    try {
      const reflection = await mealPlanReflectionService.createMealPlanReflection(req.body);
      res.status(201).json(reflection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateMealPlanReflection(req, res) {
    try {
      const reflection = await mealPlanReflectionService.updateMealPlanReflection(req.params.id, req.body);
      res.json(reflection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteMealPlanReflection(req, res) {
    try {
      await mealPlanReflectionService.deleteMealPlanReflection(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new mealPlanReflectionController();
