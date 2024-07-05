const { MealPlanReflection } = require('../models'); // 假设你有一个 MealPlanReflection 模型

class MealPlanReflectionDao {
  async getAllMealPlanReflections() {
    try {
      return await MealPlanReflection.findAll();
    } catch (error) {
      throw new Error('Error fetching meal plan reflections');
    }
  }

  async getMealPlanReflectionById(id) {
    try {
      return await MealPlanReflection.findByPk(id);
    } catch (error) {
      throw new Error('Error fetching meal plan reflection by ID');
    }
  }

  async createMealPlanReflection(data) {
    try {
      return await MealPlanReflection.create(data);
    } catch (error) {
      throw new Error('Error creating meal plan reflection');
    }
  }

  async updateMealPlanReflection(id, data) {
    try {
      const reflection = await MealPlanReflection.findByPk(id);
      if (reflection) {
        await reflection.update(data);
        return reflection;
      }
      throw new Error('Reflection not found');
    } catch (error) {
      throw new Error('Error updating meal plan reflection');
    }
  }

  async deleteMealPlanReflection(id) {
    try {
      const reflection = await MealPlanReflection.findByPk(id);
      if (reflection) {
        await reflection.destroy();
        return true;
      }
      throw new Error('Reflection not found');
    } catch (error) {
      throw new Error('Error deleting meal plan reflection');
    }
  }
}

module.exports = new MealPlanReflectionDao();
