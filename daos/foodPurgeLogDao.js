const { FoodPurgeLog } = require('../models');
const { Op } = require('sequelize');

class FoodPurgeLogDao {
  async getAllFoodPurgeLogs() {
    return await FoodPurgeLog.findAll();
  }

  async getFoodPurgeLogById(id) {
    return await FoodPurgeLog.findByPk(id);
  }

  async createFoodPurgeLog(foodPurgeLogData) {
    return await FoodPurgeLog.create(foodPurgeLogData);
  }

  async updateFoodPurgeLog(id, foodPurgeLogData) {
    const [updated] = await FoodPurgeLog.update(foodPurgeLogData, {
      where: { id: id }
    });
    if (updated) {
      return await FoodPurgeLog.findByPk(id);
    }
    throw new Error('Food Purge Log not found');
  }

  async deleteFoodPurgeLog(id) {
    const deleted = await FoodPurgeLog.destroy({
      where: { id: id }
    });
    if (!deleted) {
      throw new Error('Food Purge Log not found');
    }
    return deleted;
  }
  //按照时间查询
  async getFoodPurgeLogsBetweenDatesForUser(userId, startDate, endDate) {
    return await FoodPurgeLog.findAll({
      where: {
        user_id: userId,
        time: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ['time'],
    });
  }
  //按照情绪强度查询
  async getFoodPurgeLogsWithEmotionIntensityBetweenDatesForUser(userId, startDate, endDate) {
    return await FoodPurgeLog.findAll({
      where: {
        user_id: userId,
        time: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ['time', 'emotion_intensity'],
    });
  }
  //按照诱因查询
  async getFoodPurgeLogsBetweenDatesWithTriggersForUser(userId, startDate, endDate) {
    return await FoodPurgeLog.findAll({
      where: {
        user_id: userId,
        time: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ['time', 'trigger'],
    });
  }
  //按照情绪类型查询
  async getFoodPurgeLogsBetweenDatesWithEmotionTypeForUser(userId, startDate, endDate) {
    return await FoodPurgeLog.findAll({
      where: {
        user_id: userId,
        time: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: ['time', 'emotion_type'],
    });
  }
}


module.exports = new FoodPurgeLogDao();
