// MealPlanController.test.js

const mealPlanController = require('../../controllers/mealPlanController');
const mealPlanService = require('../../services/mealPlanService');
const mealPlanRoutes = require('../../routes/mealPlanRoutes');
const bodyParser = require('body-parser');
const request = require('supertest'); // 假设你使用的是supertest来模拟HTTP请求
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use('/api/meal_plans', mealPlanRoutes);
// 模拟mealPlanService
// jest.mock('../../services/mealPlanService', () => ({
//   getAllMealPlans: jest.fn(),
//   getMealPlanById: jest.fn(),
//   createMealPlan: jest.fn(),
//   updateMealPlan: jest.fn(),
//   deleteMealPlan: jest.fn(),
//   countMissingPlanningDays: jest.fn(),
// }));
 jest.mock('../../services/mealPlanService');
describe('MealPlanController', () => {
  let mealPlanControllerInstance;

  beforeEach(() => {
    // 创建MealPlanController实例
  });

  afterEach(() => {
    // 重置模拟函数
    mealPlanService.getAllMealPlans.mockReset();
    mealPlanService.getMealPlanById.mockReset();
    mealPlanService.createMealPlan.mockReset();
    mealPlanService.updateMealPlan.mockReset();
    mealPlanService.deleteMealPlan.mockReset();
    mealPlanService.countMissingPlanningDays.mockReset();
  });

  describe('getAllMealPlans', () => {
    it('should return all meal plans', async () => {
      // 模拟mealPlanService返回的数据
      const mockMealPlans = [
        {
          id: 1,
          user_id: 1,
          type: 'Breakfast',
          food_details: 'Oatmeal, Banana, Coffee',
          time: '07:00:00',
          date: '2024-06-01',
          target_date: '2024-06-02'
        },
        {
          id: 2,
          user_id: 1,
          type: 'Lunch',
          food_details: 'Chicken Salad, Apple',
          time: '12:00:00',
          date: '2024-06-01',
          target_date: '2024-06-02'
        },
        {
          id: 3,
          user_id: 1,
          type: 'Dinner',
          food_details: 'Grilled Salmon, Vegetables, Rice',
          time: '18:00:00',
          date: '2024-06-01',
          target_date: '2024-06-02'
        },
        {
          id: 4,
          user_id: 2,
          type: 'Breakfast',
          food_details: 'Pancakes, Blueberries, Orange Juice',
          time: '08:00:00',
          date: '2024-06-02',
          target_date: '2024-06-03'
        }
      ];   
      // 模拟mealPlanService的getAllMealPlans方法
      mealPlanService.getAllMealPlans.mockResolvedValue(mockMealPlans);

      // 测试getAllMealPlans方法
      const res = await request(app)
        .get('/api/meal_plans/');

      // 验证结果
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockMealPlans);
      expect(mealPlanService.getAllMealPlans).toHaveBeenCalled();
    });
  });
  // 模拟mealPlanService返回的数据
  const mockMealPlan = {
    id: 1,
    user_id: 1,
    type: 'Breakfast',
    food_details: 'Oatmeal, Banana, Coffee',
    time: '07:00:00',
    date: '2024-06-01',
    target_date: '2024-06-02'
  };
  describe('getMealPlanById', () => {
    it('should return a meal plan by ID', async () => {
      // 模拟mealPlanService的getMealPlanById方法
      mealPlanService.getMealPlanById.mockResolvedValue(mockMealPlan);

      // 测试getMealPlanById方法
      const res = await request(app)
        .get('/api/meal_plans/1');

      // 验证结果
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockMealPlan);
      expect(mealPlanService.getMealPlanById).toHaveBeenCalledWith('1');
    });
  });
  describe('createMealPlan', () => {
    it('should create a new meal plan', async () => {
      // 模拟 mealPlanService.createMealPlan 方法的返回值
      mealPlanService.createMealPlan.mockResolvedValue(mockMealPlan);

      // 发送POST请求到 /api/meal-plans/
      const response = await request(app)
        .post('/api/meal_plans/')
        .send(mockMealPlan);

      // 验证响应状态码
      expect(response.status).toBe(201);

      // 验证响应体是否包含模拟的 mealPlanData
      expect(response.body).toEqual(mockMealPlan);

      // 验证 mealPlanService.createMealPlan 方法是否被调用
      //expect(mealPlanService.createMealPlan).toHaveBeenCalledWith(mockMealPlan);
    });
  });
  describe('updateMealPlan', () => {
    it('should update an existing meal plan', async () => {
      // 模拟 mealPlanService.updateMealPlan 方法的返回值
      mealPlanService.updateMealPlan.mockResolvedValue(mockMealPlan);

      // 发送PUT请求到 /api/meal-plans/1
      const response = await request(app)
        .put('/api/meal_plans/1')
        .send(mockMealPlan);

      // 验证响应状态码
      expect(response.status).toBe(200);

      // 验证响应体是否包含模拟的 updatedMealPlanData
      expect(response.body).toEqual(mockMealPlan);

      // 验证 mealPlanService.updateMealPlan 方法是否被调用
      //expect(mealPlanService.updateMealPlan).toHaveBeenCalledWith(1, mockMealPlan);
    });
  });
  describe('deleteMealPlan', () => {
    it('should delete an existing meal plan', async () => {
      // 发送DELETE请求到 /api/meal-plans/1
      const response = await request(app)
        .delete('/api/meal_plans/1');

      // 验证响应状态码
      expect(response.status).toBe(204);

      // 验证 mealPlanService.deleteMealPlan 方法是否被调用
      expect(mealPlanService.deleteMealPlan).toHaveBeenCalledWith('1');
    });
  });
  describe('countMissingPlanningDays', () => {
    it('should return the number of days with missing meal plans', async () => {
      const day = { missingDays: 4 };
      const days = 4;
      // 模拟Service层的函数
      mealPlanService.countMissingPlanningDays.mockResolvedValue(days);

      const startDate = '2023-04-01';
      const endDate = '2023-04-07';
      const userId = 1;

      // 发送GET请求到 /api/meal-plans/missing-days?startDate=2023-04-01&endDate=2023-04-07
      const response = await request(app)
        .get('/api/meal_plans/missing-planning-days')
        .query({ userId, startDate, endDate });

      // 验证响应状态码
      expect(response.status).toBe(200);

      // 验证响应体是否包含缺失天数
      expect(response.body).toEqual({ missingDays: 4 });

      // 验证 mealPlanService.countMissingPlanningDays 方法是否被调用
      expect(mealPlanService.countMissingPlanningDays).toHaveBeenCalledWith(userId, startDate, endDate);
    });
  });
  // 重复以上步骤，为getMealPlanById、createMealPlan、updateMealPlan、deleteMealPlan和getAdvancedPlanningDays方法编写测试用例
});
