const mealPlanReflectionDao = require('../dao/mealPlanReflectionDao');

class MealPlanReflectionService {
  async getAllMealPlanReflections() {
    try {
      return await mealPlanReflectionDao.getAllMealPlanReflections();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getMealPlanReflectionById(id) {
    try {
      return await mealPlanReflectionDao.getMealPlanReflectionById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createMealPlanReflection(data) {
    try {
      return await mealPlanReflectionDao.createMealPlanReflection(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateMealPlanReflection(id, data) {
    try {
      return await mealPlanReflectionDao.updateMealPlanReflection(id, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteMealPlanReflection(id) {
    try {
      return await mealPlanReflectionDao.deleteMealPlanReflection(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new MealPlanReflectionService();
