// const foodPurgeLogService = require('../../services/foodPurgeLogService');
// const foodPurgeLogDao = require('../../daos/foodPurgeLogDao');

// // Mock the FoodPurgeLog DAO
// jest.mock('../../daos/foodPurgeLogDao', () => ({
//   createFoodPurgeLog: jest.fn(),
//   getAllFoodPurgeLogs: jest.fn(),
//   getFoodPurgeLogById: jest.fn(),
//   updateFoodPurgeLog: jest.fn(),
//   deleteFoodPurgeLog: jest.fn(),
//   getFoodPurgeLogsBetweenDatesForUser: jest.fn(),
//   getFoodPurgeLogsEmotionTypesForUser: jest.fn(),
//   getFoodPurgeLogsInTimeSlotsForUser: jest.fn(),
//   getFoodPurgeLogsEmotionIntensityForUser: jest.fn(),
//   getFoodPurgeLogsTriggersForUser: jest.fn(),
// }));

// describe('FoodPurgeLogService', () => {
//   const foodPurgeLogData = {
//     id: 1,
//     user_id: 1,
//     time: '12:00:00',
//     emotion_intensity: 5,
//     emotion_type: 'Happy',
//     trigger: 'Boredom',
//     additional_info: 'No additional info',
//   };

//   it('should create a new food purge log', async () => {
//     foodPurgeLogDao.createFoodPurgeLog.mockResolvedValue(foodPurgeLogData);
//     const foodPurgeLog = await FoodPurgeLogService.createFoodPurgeLog(foodPurgeLogData);
//     expect(foodPurgeLog).toEqual(foodPurgeLogData);
//   });

//   it('should get all food purge logs', async () => {
//     foodPurgeLogDao.getAllFoodPurgeLogs.mockResolvedValue([foodPurgeLogData]);
//     const foodPurgeLogs = await FoodPurgeLogService.getAllFoodPurgeLogs();
//     expect(foodPurgeLogs).toEqual([foodPurgeLogData]);
//   });

//   it('should get a food purge log by ID', async () => {
//     foodPurgeLogDao.getFoodPurgeLogById.mockResolvedValue(foodPurgeLogData);
//     const foodPurgeLog = await FoodPurgeLogService.getFoodPurgeLogById(1);
//     expect(foodPurgeLog).toEqual(foodPurgeLogData);
//   });

//   it('should update a food purge log', async () => {
//     foodPurgeLogDao.updateFoodPurgeLog.mockResolvedValue({ ...foodPurgeLogData, emotion_intensity: 3 });
//     const foodPurgeLog = await FoodPurgeLogService.updateFoodPurgeLog(1, { emotion_intensity: 3 });
//     expect(foodPurgeLog.emotion_intensity).toEqual(3);
//   });

//   it('should delete a food purge log', async () => {
//     foodPurgeLogDao.deleteFoodPurgeLog.mockResolvedValue(true);
//     const result = await FoodPurgeLogService.deleteFoodPurgeLog(1);
//     expect(result).toBe(true);
//   });
  
//   describe('getFoodPurgeLogsBetweenDatesForUser', () => {
//     beforeEach(() => {
//       // Reset the mock before each test
//       foodPurgeLogDao.getFoodPurgeLogsBetweenDatesForUser.mockReset();
//     });

//     it('should return the count of purges per day of the week', async () => {
//       // Define a test user ID and date range
//       const userId = 1;
//       const startDate = new Date('2023-01-01');
//       const endDate = new Date('2023-01-07');

//       // Mock the DAO response with logs for each day of the week
//       foodPurgeLogDao.getFoodPurgeLogsBetweenDatesForUser.mockResolvedValue([
//         { time: new Date('2023-01-01T12:00:00'), userId }, // Sunday
//         { time: new Date('2023-01-02T12:00:00'), userId }, // Monday
//         { time: new Date('2023-01-03T12:00:00'), userId }, // Tuesday
//         { time: new Date('2023-01-04T12:00:00'), userId }, // Wednesday
//         { time: new Date('2023-01-05T12:00:00'), userId }, // Thursday
//         { time: new Date('2023-01-06T12:00:00'), userId }, // Friday
//         { time: new Date('2023-01-07T12:00:00'), userId }, // Saturday
//       ]);

//       // Call the service method
//       const result = await foodPurgeLogService.getFoodPurgeLogsBetweenDatesForUser(userId, startDate, endDate);

//       // Expect the DAO method to be called once with the correct arguments
//       expect(foodPurgeLogDao.getFoodPurgeLogsBetweenDatesForUser).toHaveBeenCalledWith(userId, startDate, endDate);

//       // Expect the service to return the correct purge counts per day of the week
//       expect(result).toEqual({
//         "Sunday": 1,
//         "Monday": 1,
//         "Tuesday": 1,
//         "Wednesday": 1,
//         "Thursday": 1,
//         "Friday": 1,
//         "Saturday": 1,
//       });
//     });
//     // Add more tests for edge cases and error handling if necessary
//   });
// });
// MealPlanService.test.js

const MealPlanService = require('../../services/mealPlanService');
const mealPlanDao = require('../../daos/mealPlanDao');
// 模拟MealPlanDao
jest.mock('../../daos/mealPlanDao', () => ({
  getMealPlansByUserIdAndDateRange: jest.fn(),
  getMealPlansByUserIdAndDateRangeGroupByDate: jest.fn(),
}));


describe('MealPlanService', () => {
  let mealPlanService;

  beforeEach(() => {
    mealPlanService = MealPlanService;
  });

  afterEach(() => {
    mealPlanDao.getMealPlansByUserIdAndDateRange.mockReset();
    mealPlanDao.getMealPlansByUserIdAndDateRangeGroupByDate.mockReset();
  });

  describe('countMissingPlanningDays', () => {
    it('should return the number of days with missing meal plans', async () => {
      // 模拟DAO返回的数据
      const mockPlans = [
        { target_date: '2023-04-01'},
        { target_date: '2023-04-02'},
        // 2023-04-03的计划缺失
        { target_date: '2023-04-04'},
      ];

      // 模拟DAO层的函数
      mealPlanDao.getMealPlansByUserIdAndDateRange.mockResolvedValue(mockPlans);

      // 测试Service层的函数
      const startDate = '2023-04-01';
      const endDate = '2023-04-07';
      const userId = 1;
      const missingDays = await mealPlanService.countMissingPlanningDays(userId, startDate, endDate);

      // 验证结果
      expect(missingDays).toBe(4);
      expect(mealPlanDao.getMealPlansByUserIdAndDateRange).toHaveBeenCalledWith(userId, startDate, endDate);
    });
  });
  describe('getUnreasonableMealPlansIntervalCounts', () => {
    it('should return the number of unreasonable intervals between meal plans', async () => {
      // 模拟DAO返回的数据
      const mockPlans = [
        { id: 1, user_id: 1, type: 'breakfast', food_details: 'toast', time: '09:00', date: '2023-04-01', target_date: '2023-04-01' },
        { id: 2, user_id: 1, type: 'lunch', food_details: 'sandwich', time: '12:30', date: '2023-04-01', target_date: '2023-04-01' },
        { id: 3, user_id: 1, type: 'dinner', food_details: 'steak', time: '16:00', date: '2023-04-01', target_date: '2023-04-01' },
        // 2023-04-02的计划间隔不合理
        { id: 4, user_id: 1, type: 'breakfast', food_details: 'cereal', time: '07:00', date: '2023-04-02', target_date: '2023-04-02' },
        { id: 5, user_id: 1, type: 'lunch', food_details: 'soup', time: '13:00', date: '2023-04-02', target_date: '2023-04-02' },
      ];

      // 模拟DAO层的函数
      mealPlanDao.getMealPlansByUserIdAndDateRange.mockResolvedValue(mockPlans);
      
      // 测试Service层的函数
      const startDate = '2023-04-01';
      const endDate = '2023-04-02';
      const userId = 1;
      const unreasonableIntervals = await mealPlanService.getUnreasonableMealPlansIntervalCounts(userId, startDate, endDate);

      // 验证结果
      expect(unreasonableIntervals).toBe(1);
      expect(mealPlanDao.getMealPlansByUserIdAndDateRange).toHaveBeenCalledWith(userId, startDate, endDate);
    });
  });
  //测试不合理餐食次数
  describe('countUnreasonableMealFoodCounts', () => {
    it('should return the number of unreasonable meal foods', async () => {
      // 模拟DAO返回的数据
      const mockPlans = [
        { target_date: '2023-04-01', count: 1 }, // 计划餐食数量小于3
        { target_date: '2023-04-02', count: 3 }, // 计划餐食数量等于3
        //{ target_date: '2023-04-03', count: 5 }, // 计划餐食数量大于3
      ];

      // 模拟DAO层的函数
      mealPlanDao.getMealPlansByUserIdAndDateRangeGroupByDate.mockResolvedValue(mockPlans);
      
      // 测试Service层的函数
      const startDate = '2023-04-01';
      const endDate = '2023-04-03';
      const userId = 1;
      const unreasonableFoodCounts = await mealPlanService.getUnreasonableMealPlanCounts(userId, startDate, endDate);

      // 验证结果
      expect(unreasonableFoodCounts).toBe(2);
      expect(mealPlanDao.getMealPlansByUserIdAndDateRangeGroupByDate).toHaveBeenCalledWith(userId, startDate, endDate);
    });
  });  
});
