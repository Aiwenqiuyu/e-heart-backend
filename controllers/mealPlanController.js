const mealPlanService = require('../services/mealPlanService');

class mealPlanController {
  async getAllMealPlans(req, res) {
    try {
      const mealPlans = await mealPlanService.getAllMealPlans();
      res.json(mealPlans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMealPlanById(req, res) {
    try {
      const mealPlan = await mealPlanService.getMealPlanById(req.params.id);
      if (mealPlan) {
        res.json(mealPlan);
      } else {
        res.status(404).json({ error: 'Diet Log not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createMealPlan(req, res) {
    try {
      const mealPlan = await mealPlanService.createMealPlan(req.body);
      res.status(201).json(mealPlan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateMealPlan(req, res) {
    try {
      const mealPlan = await mealPlanService.updateMealPlan(req.params.id, req.body);
      res.json(mealPlan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteMealPlan(req, res) {
    try {
      await mealPlanService.deleteMealPlan(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async countMissingPlanningDays(req, res) {
    const userId = req.query.userId;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
      const missingDays = await mealPlanService.countMissingPlanningDays(userId, startDate, endDate);
      res.status(200).json({ missingDays });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUnreasonableMealPlansIntervalCounts(req, res) {
    const { userId, startDate, endDate } = req.query;
    try {
      const unreasonableCount = await mealPlanService.getUnreasonableMealPlansIntervalCounts(userId, startDate, endDate);
      res.json({ unreasonableCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUnreasonableMealPlanCounts(req, res) {
    const { userId, startDate, endDate } = req.query;
    try {
      const unreasonableMealPlanCounts = await mealPlanService.getUnreasonableMealPlanCounts(userId, startDate, endDate);
      res.json({ unreasonableMealPlanCounts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new mealPlanController();