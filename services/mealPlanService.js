const mealPlanDao = require('../daos/mealPlanDao');
const moment = require('moment');
class MealPlanService {
  async getAllMealPlans() {
    try {
      return await mealPlanDao.getAllMealPlans();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getMealPlanById(id) {
    try {
      return await mealPlanDao.getMealPlanById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createMealPlan(data) {
    try {
      return await mealPlanDao.createMealPlan(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateMealPlan(id, data) {
    try {
      return await mealPlanDao.updateMealPlan(id, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteMealPlan(id) {
    try {
      return await mealPlanDao.deleteMealPlan(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //计算用户缺失的计划天数
  async countMissingPlanningDays(userId, startDate, endDate) {
    const mealPlans = await mealPlanDao.getMealPlansByUserIdAndDateRange(userId, startDate, endDate);
    const planningDays = new Set();

    // 将所有计划的日期添加到集合中
    mealPlans.forEach(plan => {
      const planDate = moment(plan.target_date).startOf('day').format('YYYY-MM-DD');
      planningDays.add(planDate);
    });

    // 生成指定日期范围内的所有日期
    const datesInRange = [];
    let currentDate = moment(startDate);
    const endDateMoment = moment(endDate);
    while (currentDate <= endDateMoment) {
      datesInRange.push(currentDate.format('YYYY-MM-DD'));
      currentDate.add(1, 'days');
    }

    // 计算缺失计划的天数
    const missingDays = datesInRange.filter(date => !planningDays.has(date));

    return missingDays.length;
  }
  //查询饮食计划不合理间隔次数
  async getUnreasonableMealPlansIntervalCounts(userId,startDate, endDate) {
    const mealPlans = await mealPlanDao.getMealPlansByUserIdAndDateRange(userId, startDate, endDate);
    // const mealPlans =  [
    //   { id: 1, user_id: 1, type: 'breakfast', food_details: 'toast', time: '09:00', date: '2023-04-01', target_date: '2023-04-01' },
    //   { id: 2, user_id: 1, type: 'lunch', food_details: 'sandwich', time: '12:30', date: '2023-04-01', target_date: '2023-04-01' },
    //   { id: 3, user_id: 1, type: 'dinner', food_details: 'steak', time: '16:00', date: '2023-04-01', target_date: '2023-04-01' },
    //   // 2023-04-02的计划间隔不合理
    //   { id: 4, user_id: 1, type: 'breakfast', food_details: 'cereal', time: '07:00', date: '2023-04-02', target_date: '2023-04-02' },
    //   { id: 5, user_id: 1, type: 'lunch', food_details: 'soup', time: '13:00', date: '2023-04-02', target_date: '2023-04-02' },
    // ];
    let unreasonableCount = 0;
    // for (let i = 0; i < mealPlans.length - 1; i++) {
    //   if (!mealPlans[i].isReasonableTimeGap(mealPlans[i + 1])) {
    //     unreasonableCount++;
    //   }
    // }
    for (let i = 0; i < mealPlans.length - 1; i++) {
      // 确保比较的是同一目标日期的餐食计划
      if (mealPlans[i].target_date == mealPlans[i + 1].target_date) {
        const a = moment(mealPlans[i].time, 'HH:mm');
        const b = moment(mealPlans[i + 1].time, 'HH:mm');
        const timeGap = b.diff(a, 'seconds');
        //const timeGap = Math.abs(Date.parse(mealPlans[i + 1].time) - Date.parse(mealPlans[i].time));
        if (timeGap < 3 * 60 * 60  || timeGap > 4 * 60 * 60 ) {
          unreasonableCount++;
        }
      }
    }
    return unreasonableCount;
  }
  //计算不合理计划餐食次数
  async getUnreasonableMealPlanCounts(userId, startDate, endDate) {
    // 使用sequelize聚合功能查询每个目标日期的餐食计划数量
    const mealPlanCounts = await mealPlanDao.getMealPlansByUserIdAndDateRangeGroupByDate(userId, startDate, endDate);
    return mealPlanCounts.length;
  }
  
}

module.exports = new MealPlanService();
// meal = new MealPlanService();
// console.log(meal.getUnreasonableMealPlansIntervalCounts(1, '2023-04-01', '2023-04-02'));