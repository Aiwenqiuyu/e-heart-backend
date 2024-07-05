const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const MealPlan = require('../models/mealPlan');
const MealPlanReflection = require('../models/mealPlanReflection');

const MealPlanReflectionLink = sequelize.define('MealPlanReflectionLink', {
  meal_plan_id: {
    type: DataTypes.INTEGER,
    references: {
      model: MealPlan,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  reflection_id: {
    type: DataTypes.INTEGER,
    references: {
      model: MealPlanReflection,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'meal_plan_reflection_link',
  timestamps: false,
});

// 创建 MealPlan 和 MealPlanReflection 之间的多对多关系
MealPlan.belongsToMany(MealPlanReflection, { through: MealPlanReflectionLink });
MealPlanReflection.belongsToMany(MealPlan, { through: MealPlanReflectionLink });

module.exports = MealPlanReflectionLink;
