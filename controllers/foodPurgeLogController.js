const foodPurgeLogService = require('../services/foodPurgeLogService');

class FoodPurgeLogController {
  async getAllFoodPurgeLogs(req, res) {
    try {
      const foodPurgeLogs = await foodPurgeLogService.getAllFoodPurgeLogs();
      res.json(foodPurgeLogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getFoodPurgeLogById(req, res) {
    try {
      const foodPurgeLog = await foodPurgeLogService.getFoodPurgeLogById(req.params.id);
      if (foodPurgeLog) {
        res.json(foodPurgeLog);
      } else {
        res.status(404).json({ error: 'Food Purge Log not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createFoodPurgeLog(req, res) {
    try {
      const foodPurgeLog = await foodPurgeLogService.createFoodPurgeLog(req.body);
      res.status(201).json(foodPurgeLog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateFoodPurgeLog(req, res) {
    try {
      const foodPurgeLog = await foodPurgeLogService.updateFoodPurgeLog(req.params.id, req.body);
      res.json(foodPurgeLog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteFoodPurgeLog(req, res) {
    try {
      await foodPurgeLogService.deleteFoodPurgeLog(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // 获取用户在指定日期范围内的清除与周几的记录
  async getFoodPurgeLogsPerDayOfWeek(req, res) {
    const userId = req.params.userId;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
      const purgePerDayOfWeek = await foodPurgeLogService.getFoodPurgeLogsBetweenDatesForUser(userId, startDate, endDate);
      res.json({ purgePerDayOfWeek });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 获取用户在指定日期范围内的清除与时间段的记录
  async getFoodPurgeLogsPerTimeSlot(req, res) {
    const userId = req.params.userId;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
      const purgePerTimeSlot = await foodPurgeLogService.getFoodPurgeLogsInTimeSlotsForUser(userId, startDate, endDate);
      res.json({ purgePerTimeSlot });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 获取用户在指定日期范围内的清除与情绪强度的记录
  async getFoodPurgeLogsEmotionIntensity(req, res) {
    const userId = req.params.userId;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
      const emotionIntensity = await foodPurgeLogService.getFoodPurgeLogsEmotionIntensityForUser(userId, startDate, endDate);
      res.json({ emotionIntensity });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 获取用户在指定日期范围内的清除与触发因素的记录
  async getFoodPurgeLogsTriggers(req, res) {
    const userId = req.params.userId;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
      const triggers = await foodPurgeLogService.getFoodPurgeLogsTriggersForUser(userId, startDate, endDate);
      res.json({ triggers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 获取用户在指定日期范围内的清除与情绪类型的记录
  async getFoodPurgeLogsEmotionTypes(req, res) {
    const userId = req.params.userId;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
      const emotionTypes = await foodPurgeLogService.getFoodPurgeLogsEmotionTypesForUser(userId, startDate, endDate);
      res.json({ emotionTypes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new FoodPurgeLogController();
