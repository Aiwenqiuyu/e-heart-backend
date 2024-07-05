const foodPurgeLogDao = require('../daos/foodPurgeLogDao');

class FoodPurgeLogService {
  async getAllFoodPurgeLogs() {
    return await foodPurgeLogDao.getAllFoodPurgeLogs();
  }

  async getFoodPurgeLogById(id) {
    return await foodPurgeLogDao.getFoodPurgeLogById(id);
  }

  async createFoodPurgeLog(foodPurgeLogData) {
    return await foodPurgeLogDao.createFoodPurgeLog(foodPurgeLogData);
  }

  async updateFoodPurgeLog(id, foodPurgeLogData) {
    return await foodPurgeLogDao.updateFoodPurgeLog(id, foodPurgeLogData);
  }

  async deleteFoodPurgeLog(id) {
    return await foodPurgeLogDao.deleteFoodPurgeLog(id);
  }
  //  清除与周几
  async getFoodPurgeLogsBetweenDatesForUser(userId, startDate, endDate) {
    const logs = await foodPurgeLogDAO.getFoodPurgeLogsBetweenDatesForUser(userId, startDate, endDate);

    // Initialize a dictionary to hold the count of purges per day of the week
    const purgeCounts = {
      "Sunday": 0,
      "Monday": 0,
      "Tuesday": 0,
      "Wednesday": 0,
      "Thursday": 0,
      "Friday": 0,
      "Saturday": 0,
    };

    // Process each log and count the occurrences per day of the week
    logs.forEach(log => {
      const dayOfWeek = new Date(log.time).toLocaleString('en-US', { weekday: 'long' });
      purgeCounts[dayOfWeek]++;
    });
    return purgeCounts;
  }
  // 清除与时间段
  async getFoodPurgeLogsInTimeSlotsForUser(userId, startDate, endDate) {
    const logs = await foodPurgeLogDAO.getFoodPurgeLogsBetweenDatesForUser(userId, startDate, endDate);

    // Initialize an array to hold the count of purges per time slot
    const purgeCounts = Array(8).fill(0);

    // Define the time slots
    const timeSlots = [
      { start: 0, end: 3 },
      { start: 3, end: 6 },
      { start: 6, end: 9 },
      { start: 9, end: 12 },
      { start: 12, end: 15 },
      { start: 15, end: 18 },
      { start: 18, end: 21 },
      { start: 21, end: 24 },
    ];

    // Process each log and count the occurrences per time slot
    logs.forEach(log => {
      const logTime = new Date(log.time);
      const hour = logTime.getHours();

      // Determine which time slot the log falls into
      timeSlots.forEach((slot, index) => {
        if (hour >= slot.start && hour < slot.end) {
          purgeCounts[index]++;
        }
      });
    });

    return purgeCounts;
  }
  // 清除与情绪强度
  async getFoodPurgeLogsEmotionIntensityForUser(userId, startDate, endDate) {
    const logs = await foodPurgeLogDAO.getFoodPurgeLogsBetweenDatesForUser(userId, startDate, endDate);

    // Initialize an array to hold the count of purges per emotion intensity level
    const emotionIntensityCounts = Array(5).fill(0);

    // Process each log and count the occurrences per emotion intensity level
    logs.forEach(log => {
      const intensity = log.emotion_intensity;
      if (intensity !== null) {
        const intensityCategory = Math.min(Math.floor((intensity - 1) / 2), 4);
        emotionIntensityCounts[intensityCategory]++;
      }
    });

    return {
      "1-2": emotionIntensityCounts[0],
      "3-4": emotionIntensityCounts[1],
      "5-6": emotionIntensityCounts[2],
      "7-8": emotionIntensityCounts[3],
      "9-10": emotionIntensityCounts[4],
    };
  }
  //清楚与诱因
  async getFoodPurgeLogsTriggersForUser(userId, startDate, endDate) {
    const logs = await foodPurgeLogDAO.getFoodPurgeLogsBetweenDatesWithTriggersForUser(userId, startDate, endDate);

    const triggers = logs.map(log => log.trigger).filter(trigger => trigger !== null);

    return triggers;
  }
  // 清除与情绪类型
  async getFoodPurgeLogsEmotionTypesForUser(userId, startDate, endDate) {
    const logs = await foodPurgeLogDAO.getFoodPurgeLogsBetweenDatesWithEmotionTypeForUser(userId, startDate, endDate);

    const emotionTypeCounts = {
      "Stress": 0,
      "Anxiety": 0,
      "Sadness": 0,
      "Anger": 0,
      "Others": 0,
    };

    logs.forEach(log => {
      const emotionType = log.emotion_type;
      if (emotionType !== null) {
        switch (emotionType) {
          case "Stress":
            emotionTypeCounts["Stress"]++;
            break;
          case "Anxiety":
            emotionTypeCounts["Anxiety"]++;
            break;
          case "Sadness":
            emotionTypeCounts["Sadness"]++;
            break;
          case "Anger":
            emotionTypeCounts["Anger"]++;
            break;
          default:
            emotionTypeCounts["Others"]++;
            break;
        }
      } else {
        emotionTypeCounts["Others"]++;
      }
    });

    return emotionTypeCounts;
  }
}

module.exports = new FoodPurgeLogService();
