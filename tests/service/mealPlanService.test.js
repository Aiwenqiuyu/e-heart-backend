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
  //测试用户计划缺失的天数
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
  //测试用户计划间隔不合理的天数
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
