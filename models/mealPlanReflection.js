const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const MealPlanReflection = sequelize.define('MealPlanReflection', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reflection_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  is_planned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  reason_not_planned: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  countermeasure_not_planned: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  is_time_controlled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  is_effortted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  reason_not_efforted: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  countermeasure_not_efforted: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  is_focused_next: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  is_different_plan: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  is_improved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  improvement_content: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'meal_plan_reflection',
  timestamps: true,
});

module.exports = MealPlanReflection;
