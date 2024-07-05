const { MealPlan } = require('../models'); // 假设你有一个 MealPlan 模型
const { Op } = require('sequelize');

class MealPlanDao {
  async getAllMealPlans() {
    try {
      return await MealPlan.findAll();
    } catch (error) {
      throw new Error('Error fetching meal plans');
    }
  }

  async getMealPlanById(id) {
    try {
      return await MealPlan.findByPk(id);
    } catch (error) {
      throw new Error('Error fetching meal plan by ID');
    }
  }

  async createMealPlan(data) {
    try {
      return await MealPlan.create(data);
    } catch (error) {
      throw new Error('Error creating meal plan');
    }
  }

  async updateMealPlan(id, data) {
    try {
      const mealPlan = await MealPlan.findByPk(id);
      if (mealPlan) {
        await mealPlan.update(data);
        return mealPlan;
      }
      throw new Error('Meal plan not found');
    } catch (error) {
      throw new Error('Error updating meal plan');
    }
  }

  async deleteMealPlan(id) {
    try {
      const mealPlan = await MealPlan.findByPk(id);
      if (mealPlan) {
        await mealPlan.destroy();
        return true;
      }
      throw new Error('Meal plan not found');
    } catch (error) {
      throw new Error('Error deleting meal plan');
    }
  }
  async getMealPlansByUserIdAndDateRange(userId, startDate, endDate) {
    const plans = await MealPlan.findAll({
      where: {
        id: userId,
        target_data: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      order: [['target_date', 'ASC'], ['time', 'ASC']],
    });
    return plans;
  }
  async getMealPlansByUserIdAndDateRangeGroupByDate(userId, startDate, endDate) {
    const mealPlanCounts = await MealPlan.findAll({
      attributes: ['target_date', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      where: {
        id: userId,
        target_date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      group: ['target_date'], // 按目标日期分组
      having: sequelize.literal('COUNT(id) <= 3'), // 过滤出计划餐食数量小于等于3的记录
    });
    return mealPlanCounts
  }
}

module.exports = new MealPlanDao();
