const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MealPlan = sequelize.define('MealPlan', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    food_details: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    date: { //计划填写日期
      type: DataTypes.DATE,
      allowNull: false,
    },
    target_date: {  //计划执行日期
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'meal_plan',
    timestamps: true,
  });

  MealPlan.prototype.isReasonableTimeGap = function (nextMealPlan) {
    // 确保比较的是同一目标日期的餐食计划
    if (this.target_date.getTime() !== nextMealPlan.target_date.getTime()) {
      return true; // 如果不是同一日期，则认为间隔合理
    }
    const timeGap = Math.abs(new Date(`1970-01-01T${nextMealPlan.time}`) - new Date(`1970-01-01T${this.time}`));
    return timeGap >= 3 * 60 * 60 * 1000 && timeGap <= 4 * 60 * 60 * 1000;
  };

  return MealPlan;
};
