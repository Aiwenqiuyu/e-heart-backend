const express = require('express');
const router = express.Router();
const foodPurgeLogController = require('../controllers/foodPurgeLogController');

router.get('/', foodPurgeLogController.getAllFoodPurgeLogs);
router.get('/:id', foodPurgeLogController.getFoodPurgeLogById);
router.post('/', foodPurgeLogController.createFoodPurgeLog);
router.put('/:id', foodPurgeLogController.updateFoodPurgeLog);
router.delete('/:id', foodPurgeLogController.deleteFoodPurgeLog);
// 获取用户在指定日期范围内的清除与周几的记录
router.get('/users/:userId/food-purge-logs/purge-per-day-of-week', foodPurgeLogController.getFoodPurgeLogsPerDayOfWeek);

// 获取用户在指定日期范围内的清除与时间段的记录
router.get('/users/:userId/food-purge-logs/purge-per-time-slot', foodPurgeLogController.getFoodPurgeLogsPerTimeSlot);

// 获取用户在指定日期范围内的清除与情绪强度的记录
router.get('/users/:userId/food-purge-logs/emotion-intensity', foodPurgeLogController.getFoodPurgeLogsEmotionIntensity);

// 获取用户在指定日期范围内的清除与诱因的记录
router.get('/users/:userId/food-purge-logs/triggers', foodPurgeLogController.getFoodPurgeLogsTriggers);

// 获取用户在指定日期范围内的清除与情绪类型的记录
router.get('/users/:userId/food-purge-logs/emotion-types', foodPurgeLogController.getFoodPurgeLogsEmotionTypes);

module.exports = router;
